import { DocsLayout } from '../../components/DocsLayout';

export default function HowThisWorks() {
  return (
    <DocsLayout>
      <article className="prose dark:prose-invert max-w-none">
        <h1>How This Works</h1>

        <p className="lead">
          A deep dive into the internal architecture and design decisions behind
          shimmer-from-structure.
        </p>

        <h2>The Problem</h2>

        <p>
          Building modern web applications means dealing with asynchronous data. While your app
          fetches user profiles, product listings, or dashboard metrics from an API, users stare at
          blank screens or spinners. The industry solution? Loading skeletons - placeholder UI that
          mimics the structure of the content to come.
        </p>

        <p>
          But here's the catch: writing loading skeletons is{' '}
          <strong>repetitive, error-prone, and a maintenance nightmare</strong>. Every time you
          build a new component, you write it twice - once for the real content, and once for the
          skeleton. Change the layout? Update both versions. Add a new field? Don't forget the
          skeleton. The two implementations drift apart, and suddenly your loading state looks
          nothing like your actual UI.
        </p>

        <p>
          Yet the skeleton structure you're manually recreating <strong>already exists</strong> -
          it's right there in the rendered DOM. Your component knows how to lay itself out. It knows
          where the heading goes, how wide the text blocks are, where the avatar sits. The browser
          has already calculated every dimension, every position, every spacing rule.
        </p>

        <p>
          This is the core insight behind shimmer-from-structure:{' '}
          <strong>if the structure already exists in the DOM, why not measure it?</strong> Instead
          of maintaining parallel skeleton components, we can render the real component once, read
          its dimensions using browser APIs like <code>getBoundingClientRect()</code>, and generate
          pixel-perfect shimmer overlays automatically. No duplication. No drift. No manual
          maintenance.
        </p>

        <h2>The Core Idea</h2>

        <p>
          At its heart, shimmer-from-structure uses a simple but powerful technique:
          <strong>runtime DOM measurement</strong>. When you wrap a component in{' '}
          <code>
            &lt;Shimmer loading={'{'}true{'}'}&gt;
          </code>
          , the library renders your component normally, then walks through the resulting DOM tree
          and calls <code>getBoundingClientRect()</code> on each element.
        </p>

        <p>
          This browser API returns the exact position and dimensions of every element as the browser
          has calculated them - accounting for CSS, flexbox, grid, responsive breakpoints, dynamic
          content, everything. We capture the <code>top</code>, <code>left</code>,{' '}
          <code>width</code>, and <code>height</code> of each text node, image, button, and
          container.
        </p>

        <p>
          Once we have these measurements, we create{' '}
          <strong>absolutely-positioned shimmer overlays</strong> that sit on top of the real
          content. Each overlay is a <code>&lt;div&gt;</code> with:
        </p>

        <ul>
          <li>
            <code>position: absolute</code> to remove it from document flow
          </li>
          <li>
            <code>top</code> and <code>left</code> values matching the measured element's position
          </li>
          <li>
            <code>width</code> and <code>height</code> matching the measured element's dimensions
          </li>
          <li>
            A shimmer animation (CSS gradient with <code>background-position</code>
            keyframes)
          </li>
        </ul>

        <p>
          Text overlays are then <strong>vertically inset inside that measured box</strong>. CSS
          line boxes are taller than the glyphs they contain, so filling the full rect makes stacked
          lines look like one merged slab. The reserved layout stays the same (no layout shift);
          only the visible bar shrinks, using leftover line-height leading so stacked lines separate
          without shrinking large display text down to a hairline. Images, buttons, padded pills,
          and <code>data-shimmer-no-children</code> blocks keep their full measured size.
        </p>

        <p>
          The real content underneath is made transparent using <code>color: transparent</code> (not{' '}
          <code>opacity: 0</code>, which would hide backgrounds and borders). This means the shimmer
          blocks appear exactly where your text, images, and UI elements will be - because they're
          positioned based on where those elements <em>actually are</em>.
        </p>

        <p>
          When <code>loading</code> becomes <code>false</code>, the shimmer overlays are removed,
          the content becomes visible again, and your component displays normally. The transition is
          seamless because the layout never changed - the shimmer was always matching the real
          structure.
        </p>

        <h2>Design Constraints</h2>

        <p>
          While the runtime DOM measurement approach is powerful, it comes with important
          constraints that shaped the library's design and implementation. Understanding these
          limitations helps explain why certain architectural decisions were made and how the
          library achieves its performance goals.
        </p>

        <h3>SSR Environments</h3>

        <p>
          The library's core technique - calling <code>getBoundingClientRect()</code>
          on DOM elements - fundamentally requires a browser environment. This API doesn't exist in
          server-side rendering (SSR) contexts like Next.js's <code>getServerSideProps</code>, Remix
          loaders, or Node.js environments.
        </p>

        <p>
          This means{' '}
          <strong>shimmer-from-structure cannot generate shimmer overlays during SSR</strong>. The
          measurement phase must happen client-side, after the component has mounted and the browser
          has calculated layout. For SSR frameworks, this is acceptable because:
        </p>

        <ul>
          <li>
            The shimmer is a <strong>loading state</strong> - it only appears while fetching data,
            which typically happens client-side anyway
          </li>
          <li>
            SSR delivers the initial HTML shell quickly; the shimmer activates during client-side
            data fetching
          </li>
          <li>
            The library detects SSR environments and safely skips measurement, preventing runtime
            errors
          </li>
        </ul>

        <p>
          All framework adapters include SSR guards that check for{' '}
          <code>typeof window !== 'undefined'</code> before attempting DOM measurement. This ensures
          the library works seamlessly in SSR frameworks without requiring special configuration.
        </p>

        <h3>Frame Budget</h3>

        <p>
          Browsers render at 60 frames per second (fps), which means each frame has a budget of
          approximately <strong>16.67 milliseconds</strong>. If JavaScript execution, layout
          calculations, or painting take longer than this, the browser drops frames, causing visible
          stuttering or flicker.
        </p>

        <p>
          The measurement phase - where the library walks the DOM tree and calls{' '}
          <code>getBoundingClientRect()</code> on each element - must complete within this frame
          budget. If measurement takes too long, users will see a flash of unstyled content before
          the shimmer appears.
        </p>

        <p>To stay within the frame budget, the library:</p>

        <ul>
          <li>
            <strong>Minimizes DOM traversal overhead</strong> by using efficient tree walking
            algorithms
          </li>
          <li>
            <strong>Batches measurements</strong> to trigger only one browser reflow (see
            "Minimizing Reflows" section)
          </li>
          <li>
            <strong>Skips unnecessary elements</strong> using <code>data-shimmer-ignore</code>
            and <code>data-shimmer-no-children</code> attributes
          </li>
          <li>
            <strong>Caches computed styles</strong> to avoid redundant style calculations
          </li>
        </ul>

        <p>
          For typical component trees (dozens to hundreds of elements), measurement completes in
          2-5ms, well within the frame budget. For extremely large trees (thousands of elements),
          developers can use <code>data-shimmer-no-children</code>
          to treat complex subtrees as single shimmer blocks, reducing measurement overhead.
        </p>

        <h3>Reflow Minimization</h3>

        <p>
          A <strong>reflow</strong> (also called layout recalculation) occurs when the browser
          recalculates the position and dimensions of elements in the document. Reflows are
          expensive operations that can take several milliseconds, especially for complex layouts.
        </p>

        <p>
          Reading layout properties like <code>getBoundingClientRect()</code>,{' '}
          <code>offsetWidth</code>, or <code>getComputedStyle()</code> forces the browser to perform
          a reflow if any DOM changes have occurred since the last layout. Worse, interleaving DOM
          writes (changing styles or content) with DOM reads (measuring dimensions) causes{' '}
          <strong>multiple reflows</strong> - a performance anti-pattern known as "layout
          thrashing."
        </p>

        <p>
          The library's measurement strategy is designed to trigger <strong>only one reflow</strong>{' '}
          per measurement cycle:
        </p>

        <ol>
          <li>
            <strong>Apply all CSS changes first</strong> (set <code>color: transparent</code>,
            inject measurement styles) without reading any layout properties
          </li>
          <li>
            <strong>Perform all measurements</strong> in a single pass, reading{' '}
            <code>getBoundingClientRect()</code> on every element without making any DOM changes
          </li>
          <li>
            <strong>Render shimmer overlays</strong> using the captured measurements, which doesn't
            affect the measured elements' layout
          </li>
        </ol>

        <p>
          This batching strategy ensures that even complex component trees with hundreds of elements
          trigger only one reflow, keeping the measurement phase fast and preventing visual flicker.
          The "Edge Case: Table Cells" section below describes a specific optimization where this
          batching approach was critical for performance.
        </p>

        <h2>Developer API Design</h2>

        <p>
          With the technical constraints understood, the next challenge was designing an API that
          developers would actually want to use. The goal was to make shimmer loading{' '}
          <strong>trivially easy to add to any project</strong> - no configuration files, no build
          steps, no complex setup. Just wrap your component and get pixel-perfect loading states.
        </p>

        <p>
          The API design centers on a simple wrapper pattern: the <code>&lt;Shimmer&gt;</code>
          component. You wrap any component you want to shimmer, pass a <code>loading</code>
          boolean, and the library handles the rest:
        </p>

        <pre>
          <code>{`import { Shimmer } from '@shimmer-from-structure/react';

function UserProfile({ userId }) {
  const { data: user, isLoading } = useQuery(['user', userId], fetchUser);

  return (
    <Shimmer loading={isLoading}>
      <div className="profile">
        <img src={user?.avatar} alt={user?.name} />
        <h2>{user?.name}</h2>
        <p>{user?.bio}</p>
      </div>
    </Shimmer>
  );
}`}</code>
        </pre>

        <p>
          When <code>loading</code> is <code>true</code>, the library measures the child component
          and renders shimmer overlays. When <code>loading</code> becomes <code>false</code>, the
          shimmer disappears and the real content shows. No separate skeleton component to maintain,
          no layout duplication, no drift between loading and loaded states.
        </p>

        <h3>Handling Dynamic Data with templateProps</h3>

        <p>
          But there's a problem: what if your component needs data to render? In the example above,{' '}
          <code>user</code> is <code>undefined</code> while loading, so the component would render
          empty - giving the measurement phase nothing to measure.
        </p>

        <p>
          This is where <code>templateProps</code> comes in. You provide mock data that gets spread
          onto the child component during the measurement phase:
        </p>

        <pre>
          <code>{`import { Shimmer } from '@shimmer-from-structure/react';

const mockUser = {
  avatar: 'https://via.placeholder.com/150',
  name: 'John Doe',
  bio: 'Software engineer and open source contributor.',
};

function UserProfile({ userId }) {
  const { data: user, isLoading } = useQuery(['user', userId], fetchUser);

  return (
    <Shimmer 
      loading={isLoading} 
      templateProps={{ user: mockUser }}
    >
      <div className="profile">
        <img src={user?.avatar} alt={user?.name} />
        <h2>{user?.name}</h2>
        <p>{user?.bio}</p>
      </div>
    </Shimmer>
  );
}`}</code>
        </pre>

        <p>
          During measurement, the library clones the child component and spreads{' '}
          <code>templateProps</code> onto it, so the component renders with mock data. The browser
          calculates layout based on this mock content, and the library captures those dimensions.
          When <code>loading</code> becomes <code>false</code>, the real data replaces the mock
          data, and because the layout structure is the same, the transition is seamless.
        </p>

        <h3>Design Choice: One Child at a Time</h3>

        <p>
          The <code>&lt;Shimmer&gt;</code> component accepts{' '}
          <strong>exactly one child that accepts props</strong>. This is a deliberate design
          constraint that keeps the API simple and predictable:
        </p>

        <ul>
          <li>
            <strong>Clear prop spreading:</strong> The library knows exactly where to spread{' '}
            <code>templateProps</code> - onto the single child component
          </li>
          <li>
            <strong>Predictable behavior:</strong> Developers don't have to guess which child
            receives which props
          </li>
          <li>
            <strong>Composability:</strong> If you need to shimmer multiple components, wrap each
            one individually or wrap a parent container
          </li>
          <li>
            <strong>Framework compatibility:</strong> This pattern works consistently across React,
            Vue, Svelte, Angular, and Solid
          </li>
        </ul>

        <p>
          This constraint trades flexibility for simplicity. You can't wrap multiple sibling
          components in a single <code>&lt;Shimmer&gt;</code>, but in practice, this is rarely
          needed - and when it is, wrapping a parent container works just as well. The benefit is an
          API that's immediately understandable and works the same way in every framework.
        </p>

        <h2>Architecture Decision</h2>

        <p>
          One of the most important architectural decisions in shimmer-from-structure was how to
          support multiple JavaScript frameworks (React, Vue, Svelte, Angular, SolidJS) without
          duplicating the core measurement and shimmer logic. The solution is a{' '}
          <strong>
            monorepo architecture with a framework-agnostic core package and framework-specific
            adapter packages
          </strong>
          .
        </p>

        <h3>Core Package</h3>

        <p>
          The <code>@shimmer-from-structure/core</code> package contains all the framework-agnostic
          DOM measurement and shimmer logic. This includes:
        </p>

        <ul>
          <li>
            <strong>
              <code>extractElementInfo()</code>
            </strong>{' '}
            - Reads <code>getBoundingClientRect()</code> and computed styles on a DOM element to
            produce an <code>ElementInfo</code> object with position, dimensions, and border radius
          </li>
          <li>
            <strong>
              <code>isLeafElement()</code>
            </strong>{' '}
            - Determines whether an element should receive a shimmer block (ignores void elements
            like <code>&lt;br&gt;</code>, <code>&lt;wbr&gt;</code>, <code>&lt;hr&gt;</code>)
          </li>
          <li>
            <strong>
              <code>createResizeObserver()</code>
            </strong>{' '}
            - Shared <code>ResizeObserver</code> utility with <code>requestAnimationFrame</code>
            throttling for responsive shimmer updates
          </li>
          <li>
            <strong>
              <code>SHIMMER_CONTAINER_STYLES</code>
            </strong>{' '}
            - CSS string applied to measurement containers, handling{' '}
            <code>data-shimmer-ignore</code> and <code>data-shimmer-no-children</code> attribute
            exclusions
          </li>
          <li>
            <strong>
              <code>shimmerDefaults</code>
            </strong>{' '}
            - Default configuration values (colors, duration, border radius) shared across all
            adapters
          </li>
          <li>
            <strong>TypeScript types</strong> - Shared interfaces like <code>ElementInfo</code>,{' '}
            <code>ShimmerConfig</code>, and <code>ShimmerContextValue</code>
          </li>
        </ul>

        <p>
          The key insight is that{' '}
          <strong>all of these utilities use cross-framework browser APIs</strong>.{' '}
          <code>getBoundingClientRect()</code>, <code>getComputedStyle()</code>,{' '}
          <code>ResizeObserver</code>, and DOM traversal work identically in React, Vue, Svelte,
          Angular, and SolidJS. There's no framework-specific logic in the core package - it's pure
          DOM manipulation.
        </p>

        <p>
          This design means that bug fixes, performance optimizations, and new features in the
          measurement logic only need to be implemented once. When the table cell batching
          optimization (described in the "Edge Case: Table Cells" section) was added to core, all
          five framework adapters immediately benefited without any adapter-specific changes.
        </p>

        <h3>Framework Adapters</h3>

        <p>
          Each framework adapter (<code>@shimmer-from-structure/react</code>,{' '}
          <code>@shimmer-from-structure/vue</code>, <code>@shimmer-from-structure/svelte</code>,{' '}
          <code>@shimmer-from-structure/angular</code>, <code>@shimmer-from-structure/solid</code>)
          is a thin wrapper around the core package. Adapters are responsible for:
        </p>

        <ul>
          <li>
            <strong>Hooking into framework-specific rendering lifecycles</strong> - React uses{' '}
            <code>useLayoutEffect</code> (synchronous, before paint), Vue uses <code>watch</code>{' '}
            and <code>nextTick</code>, Svelte uses <code>$effect</code> and <code>onMount</code>,
            Angular uses <code>ngAfterViewInit</code>, and SolidJS uses <code>createEffect</code>
          </li>
          <li>
            <strong>Managing component state</strong> - Each framework has its own reactivity system
            (React's <code>useState</code>, Vue's <code>ref</code>, Svelte's runes, Angular's
            signals, SolidJS's signals)
          </li>
          <li>
            <strong>Providing global configuration</strong> - React uses Context API (
            <code>ShimmerProvider</code>), Vue uses <code>provide/inject</code>, Svelte uses{' '}
            <code>setContext/getContext</code>, Angular uses dependency injection (
            <code>provideShimmerConfig</code>), and SolidJS uses <code>createContext</code>
          </li>
          <li>
            <strong>Rendering shimmer overlays</strong> - Each framework has its own templating
            syntax (JSX, Vue templates, Svelte templates, Angular templates)
          </li>
          <li>
            <strong>Handling SSR detection</strong> - Checking for{' '}
            <code>typeof window !== 'undefined'</code> before calling core measurement functions
          </li>
        </ul>

        <p>
          The adapters import core utilities and call them at the appropriate points in each
          framework's lifecycle. For example, the React adapter calls{' '}
          <code>extractElementInfo()</code> inside a <code>useLayoutEffect</code> hook, which runs
          synchronously before the browser paints, preventing visual flicker. The Vue adapter calls
          the same function inside a <code>watch</code> callback with <code>nextTick</code> for DOM
          updates. The measurement logic is identical - only the timing and lifecycle integration
          differs.
        </p>

        <p>This separation between core logic and framework-specific code has several benefits:</p>

        <ul>
          <li>
            <strong>Consistency:</strong> All frameworks get the same measurement behavior, shimmer
            animation, and configuration options
          </li>
          <li>
            <strong>Maintainability:</strong> Core logic changes don't require updating five
            separate adapters
          </li>
          <li>
            <strong>Testability:</strong> Core utilities can be unit tested in isolation without
            framework-specific test setup
          </li>
          <li>
            <strong>Extensibility:</strong> Adding support for a new framework only requires writing
            a thin adapter - the core logic is already done
          </li>
        </ul>

        <p>
          The architecture can be visualized as a core package with multiple framework adapters
          depending on it:
        </p>

        <pre className="text-sm">
          <code>{`
┌─────────────────────────────────────────┐
│    @shimmer-from-structure/core         │
│  (extractElementInfo, isLeafElement,    │
│   createResizeObserver, etc.)           │
└─────────────────┬───────────────────────┘
                  │
        ┌─────────┼─────────┬─────────┬─────────┐
        │         │         │         │         │
        ▼         ▼         ▼         ▼         ▼
    ┌───────┐ ┌───────┐ ┌────────┐ ┌─────────┐ ┌───────┐
    │ React │ │  Vue  │ │ Svelte │ │ Angular │ │ Solid │
    └───────┘ └───────┘ └────────┘ └─────────┘ └───────┘
  `}</code>
        </pre>

        <p>
          This architecture ensures that shimmer-from-structure can support any JavaScript framework
          without compromising on consistency, performance, or maintainability. The core package
          handles the complex DOM measurement and reflow optimization logic, while adapters focus
          solely on framework integration - a clean separation of concerns that scales as new
          frameworks are added.
        </p>

        <h2>Handling Real-World Data</h2>

        <p>
          The measurement approach works beautifully for static components, but real-world
          applications present a challenge:{' '}
          <strong>components typically render dynamic data from APIs</strong>. A user profile card
          doesn't have hardcoded text - it displays a name, avatar, and bio fetched from a backend.
          A product listing shows items loaded from a database. A dashboard renders metrics pulled
          from analytics services.
        </p>

        <p>This creates a chicken-and-egg problem for shimmer measurement.</p>

        <h3>The Problem</h3>

        <p>
          When <code>loading</code> is <code>true</code>, the data hasn't arrived yet. If your
          component expects a <code>user</code> prop and that prop is <code>undefined</code>, the
          component might render nothing - or worse, crash with a null reference error. Either way,
          the measurement phase has nothing to measure. An empty component produces zero-dimension
          measurements, resulting in no shimmer blocks at all.
        </p>

        <p>Consider this typical React component:</p>

        <pre>
          <code>{`function UserCard({ user }) {
  return (
    <div className="card">
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
      <span className="badge">{user.role}</span>
    </div>
  );
}`}</code>
        </pre>

        <p>
          If <code>user</code> is <code>undefined</code>, this component will throw an error trying
          to access <code>user.avatar</code>. Even with optional chaining (<code>user?.avatar</code>
          ), the component renders empty content, giving the measurement phase nothing to work with.
        </p>

        <p>You could add conditional rendering to handle the loading state:</p>

        <pre>
          <code>{`function UserCard({ user }) {
  if (!user) {
    return <div className="card">Loading...</div>;
  }
  
  return (
    <div className="card">
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
      <span className="badge">{user.role}</span>
    </div>
  );
}`}</code>
        </pre>

        <p>
          But now you're back to square one - you've created a separate loading state that doesn't
          match the real component structure. The whole point of shimmer-from-structure is to avoid
          this duplication.
        </p>

        <h3>The Solution</h3>

        <p>
          The solution is <code>templateProps</code> - a way to provide{' '}
          <strong>mock data during the measurement phase</strong> so the component can render with
          realistic content, allowing the library to capture accurate dimensions. The mock data is
          only used internally for measurement; it never appears to the user.
        </p>

        <p>Here's how it works in practice:</p>

        <pre>
          <code>{`import { Shimmer } from '@shimmer-from-structure/react';

// Define mock data that matches the shape of real API data
const mockUser = {
  avatar: 'https://via.placeholder.com/150',
  name: 'John Doe',
  bio: 'Software engineer and open source contributor with 6 years of experience.',
  role: 'Senior Developer',
};

function UserProfile({ userId }) {
  // Fetch real user data from API
  const { data: user, isLoading } = useQuery(['user', userId], fetchUser);

  return (
    <Shimmer 
      loading={isLoading} 
      templateProps={{ user: mockUser }}
    >
      <UserCard user={user ?? mockUser} />
    </Shimmer>
  );
}

function UserCard({ user }) {
  return (
    <div className="card">
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
      <span className="badge">{user.role}</span>
    </div>
  );
}`}</code>
        </pre>

        <p>
          When <code>loading</code> is <code>true</code>, the library:
        </p>

        <ol>
          <li>
            Clones the <code>&lt;UserCard&gt;</code> component
          </li>
          <li>
            Spreads <code>templateProps</code> onto it, so it receives{' '}
            <code>
              user={'{'}mockUser{'}'}
            </code>
          </li>
          <li>Renders the component with mock data in a hidden measurement container</li>
          <li>
            Measures the resulting DOM structure using <code>getBoundingClientRect()</code>
          </li>
          <li>Generates shimmer overlays based on those measurements</li>
          <li>
            Renders the real component (which receives{' '}
            <code>
              user={'{'}mockUser{'}'}
            </code>
            from the fallback) with shimmer overlays on top
          </li>
        </ol>

        <p>
          When <code>loading</code> becomes <code>false</code>, the shimmer overlays are removed,
          and the component displays the real data. Because the mock data and real data have the
          same structure (same fields, similar text lengths), the layout remains consistent, and the
          transition is seamless.
        </p>

        <p>
          The <code>user ?? mockUser</code> fallback in the example ensures the component always
          receives valid data, preventing null reference errors during the loading state. This
          pattern works across all supported frameworks - React, Vue, Svelte, Angular, and SolidJS.
        </p>

        <h3>Why One Child at a Time?</h3>

        <p>
          You might wonder why <code>&lt;Shimmer&gt;</code> only accepts a single child component
          that accepts props. This design constraint exists for a practical reason:
          <strong>prop spreading needs an unambiguous target</strong>.
        </p>

        <p>
          If <code>&lt;Shimmer&gt;</code> accepted multiple children, which one should receive{' '}
          <code>templateProps</code>? The first? All of them? What if they expect different prop
          shapes? The API would become confusing and error-prone.
        </p>

        <p>By restricting to one prop-accepting child, the behavior is predictable:</p>

        <ul>
          <li>
            <strong>Clear semantics:</strong> <code>templateProps</code> always goes to the single
            child component
          </li>
          <li>
            <strong>Type safety:</strong> TypeScript can infer the correct prop types
          </li>
          <li>
            <strong>Framework consistency:</strong> The pattern works identically in React, Vue,
            Svelte, Angular, and SolidJS
          </li>
          <li>
            <strong>Composability:</strong> If you need to shimmer multiple components, wrap each
            one individually or wrap a parent container
          </li>
        </ul>

        <p>
          This constraint trades flexibility for simplicity and predictability - a deliberate design
          choice that makes the library easier to use correctly and harder to use incorrectly.
        </p>

        <h2>Minimizing Reflows</h2>

        <p>
          Performance is critical for loading states. If the shimmer takes too long to appear or
          causes visible stuttering, users will notice - and the experience degrades. One of the
          most important performance optimizations in shimmer-from-structure is{' '}
          <strong>minimizing browser reflows</strong> during the measurement phase.
        </p>

        <h3>What are Reflows?</h3>

        <p>
          A <strong>reflow</strong> (also called layout recalculation or layout thrashing when it
          happens repeatedly) is a browser operation that recalculates the position and dimensions
          of elements in the document. When you change an element's size, position, or content, the
          browser must recalculate the layout of that element and potentially all of its descendants
          and ancestors.
        </p>

        <p>
          Reflows are expensive. For complex layouts with hundreds or thousands of elements, a
          single reflow can take several milliseconds. This matters because:
        </p>

        <ul>
          <li>
            <strong>Reflows block the main thread</strong> - JavaScript execution pauses while the
            browser recalculates layout
          </li>
          <li>
            <strong>Reflows cause visual flicker</strong> - if measurement takes too long, users see
            a flash of unstyled content before the shimmer appears
          </li>
          <li>
            <strong>Multiple reflows compound</strong> - interleaving DOM writes and reads forces
            the browser to reflow repeatedly, multiplying the performance cost
          </li>
        </ul>

        <p>
          Reading layout properties like <code>getBoundingClientRect()</code>,{' '}
          <code>offsetWidth</code>, <code>clientHeight</code>, or <code>getComputedStyle()</code>{' '}
          forces the browser to perform a reflow if any DOM changes have occurred since the last
          layout calculation. This is called a <strong>forced synchronous layout</strong>.
        </p>

        <p>
          The worst-case scenario is <strong>layout thrashing</strong> - alternating between DOM
          writes (changing styles or content) and DOM reads (measuring dimensions). Each read forces
          a reflow to get accurate measurements, then the next write invalidates the layout, and the
          cycle repeats. This can easily consume tens or hundreds of milliseconds, causing visible
          performance problems.
        </p>

        <h3>Base Case</h3>

        <p>
          The library's measurement strategy is designed to trigger{' '}
          <strong>only one reflow per measurement cycle</strong>, regardless of how many elements
          are being measured. This is achieved through careful batching of DOM operations into three
          distinct phases:
        </p>

        <ol>
          <li>
            <strong>Write Phase:</strong> Apply all CSS changes first - set{' '}
            <code>color: transparent</code> on text elements, inject measurement container styles,
            apply <code>data-shimmer-ignore</code> exclusions - without reading any layout
            properties
          </li>
          <li>
            <strong>Read Phase:</strong> Perform all measurements in a single pass, calling{' '}
            <code>getBoundingClientRect()</code> on every element that needs to be measured, without
            making any DOM changes
          </li>
          <li>
            <strong>Render Phase:</strong> Generate and render shimmer overlays using the captured
            measurements, which doesn't affect the measured elements' layout since overlays are
            absolutely positioned
          </li>
        </ol>

        <p>
          This batching strategy ensures that the browser only needs to recalculate layout once - at
          the start of the read phase, after all CSS changes have been applied. Even if you're
          measuring a component tree with hundreds of elements, the library triggers only one
          reflow.
        </p>

        <p>
          For typical component trees (dozens to hundreds of elements), the entire measurement cycle
          completes in 2-5 milliseconds, well within the 16.67ms frame budget for 60fps rendering.
          This means the shimmer appears instantly without any visible flicker or stuttering.
        </p>

        <p>
          The "Edge Case: Table Cells" section (if implemented) describes a specific scenario where
          this batching approach was critical - measuring table cell text required temporarily
          injecting span elements, and the naive sequential approach caused multiple reflows. The
          optimized solution applies the same three-phase batching pattern to achieve one reflow
          even for complex table layouts.
        </p>

        <h3>ResizeObserver</h3>

        <p>
          The measurement phase handles the initial shimmer rendering, but what happens when the
          window resizes? Responsive layouts change dimensions at different breakpoints - a
          three-column grid might become two columns on tablets and one column on mobile. The
          shimmer needs to update to match the new layout.
        </p>

        <p>
          The library uses the <strong>ResizeObserver API</strong> to detect when the measured
          container's dimensions change. When a resize is detected, the library re-measures the
          component and updates the shimmer overlays to match the new layout.
        </p>

        <p>
          Critically, <code>ResizeObserver</code> callbacks are automatically batched by the browser
          and fire <strong>after layout has been calculated but before paint</strong>. This means:
        </p>

        <ul>
          <li>
            <strong>No forced synchronous layouts</strong> - the browser has already calculated the
            new layout when the callback fires, so reading <code>getBoundingClientRect()</code>{' '}
            doesn't trigger an additional reflow
          </li>
          <li>
            <strong>Automatic batching</strong> - if multiple elements resize simultaneously (common
            during window resize), the browser batches all resize notifications into a single
            callback invocation
          </li>
          <li>
            <strong>Optimal timing</strong> - the callback fires at the ideal moment to read layout
            properties without causing performance issues
          </li>
        </ul>

        <p>
          The library further optimizes resize handling by throttling updates using{' '}
          <code>requestAnimationFrame</code>. This ensures that even if the user rapidly resizes the
          window, shimmer updates are limited to once per frame (60fps), preventing unnecessary
          re-measurements and keeping the UI responsive.
        </p>

        <p>
          The <code>createResizeObserver</code> utility in the core package implements this
          optimization and is shared across all framework adapters (React, Vue, Svelte, Angular,
          SolidJS). This means every framework gets the same efficient resize handling without
          duplicating the throttling logic.
        </p>

        <p>
          The combination of one-reflow measurement and efficient resize handling ensures that
          shimmer-from-structure maintains excellent performance even in complex, responsive
          layouts. Users never see flicker or stuttering, and the shimmer always matches the current
          layout - regardless of screen size or window dimensions.
        </p>

        <h2>Edge Case: Table Cells</h2>

        <p>
          While the three-phase batching strategy works well for most elements, table cells
          presented a unique challenge that required a specialized optimization. This edge case
          demonstrates how the reflow minimization principles apply even to complex scenarios.
        </p>

        <h3>The Problem</h3>

        <p>
          When measuring table cells (<code>&lt;td&gt;</code> and <code>&lt;th&gt;</code>
          elements), we want to capture the dimensions of the <strong>text content</strong>, not the
          entire cell. This is because table cells often have padding, and measuring the full cell
          would create shimmer blocks that extend into the padding area, looking visually incorrect.
        </p>

        <p>Consider a typical table cell:</p>

        <pre>
          <code>{`<td style="padding: 12px;">
  Product Name
</td>`}</code>
        </pre>

        <p>
          If we measure the <code>&lt;td&gt;</code> element directly using{' '}
          <code>getBoundingClientRect()</code>, we get the dimensions of the entire cell including
          the 12px padding on all sides. The shimmer block would cover the padding area, creating a
          visual mismatch - the shimmer would be larger than the actual text.
        </p>

        <p>
          What we really want is to measure just the text content, excluding the cell's padding. But
          text nodes don't have <code>getBoundingClientRect()</code> - only elements do. We need a
          way to measure the text dimensions without measuring the cell's padding.
        </p>

        <h3>Initial Approach</h3>

        <p>
          The naive solution is to temporarily wrap the text content in a <code>&lt;span&gt;</code>{' '}
          element, measure the span, then remove it:
        </p>

        <pre>
          <code>{`// For each table cell with text-only content:
const span = document.createElement('span');
span.style.display = 'inline';

// Move text into span
while (cell.firstChild) {
  span.appendChild(cell.firstChild);
}
cell.appendChild(span);

// Measure the span (not the cell)
const rect = span.getBoundingClientRect();

// Remove the span and restore text
while (span.firstChild) {
  cell.insertBefore(span.firstChild, span);
}
cell.removeChild(span);`}</code>
        </pre>

        <p>
          This approach works correctly - the span wraps only the text content, so measuring it
          gives us the text dimensions without the cell's padding. However, there's a critical
          performance problem: <strong>this creates multiple reflows</strong>.
        </p>

        <p>
          If you process table cells sequentially - wrap, measure, unwrap, repeat - you're
          interleaving DOM writes (wrapping/unwrapping) with DOM reads (measuring). Each measurement
          forces a reflow because the previous wrap operation invalidated the layout. For a table
          with dozens of cells, this could trigger dozens of reflows, causing visible performance
          degradation.
        </p>

        <h3>Optimized Solution</h3>

        <p>
          The solution is to apply the same three-phase batching pattern used for the overall
          measurement strategy. Instead of processing cells sequentially, we batch all table cell
          operations into three distinct phases:
        </p>

        <ol>
          <li>
            <strong>Phase 1 - Writes Only:</strong> Traverse the DOM tree, identify all text-only
            table cells, and wrap their content in <code>&lt;span&gt;</code>
            elements. Collect references to the wrapped cells for later measurement. Do not call{' '}
            <code>getBoundingClientRect()</code> yet.
          </li>
          <li>
            <strong>Phase 2 - Measurements:</strong> Measure all wrapped spans (and all other leaf
            elements) in a single pass. The first <code>getBoundingClientRect()</code>
            call triggers one reflow, and subsequent calls use the cached layout.
          </li>
          <li>
            <strong>Phase 3 - Cleanup:</strong> Remove all temporary span wrappers and restore the
            original text nodes. This happens after all measurements are complete, so it doesn't
            affect the captured dimensions.
          </li>
        </ol>

        <p>
          This batching approach ensures that <strong>only one reflow occurs</strong>, regardless of
          how many table cells need to be measured. Even a complex data table with hundreds of cells
          triggers just one reflow during the measurement phase.
        </p>

        <p>Here's the implementation structure from the core package:</p>

        <pre>
          <code>{`function extractElementInfo(element: Element, parentRect: DOMRect): ElementInfo[] {
  const leafElements: LeafElement[] = [];
  const wrappedCells: WrappedCell[] = [];

  // Phase 1: Collect leaf elements and wrap table cells (writes only)
  collectLeafElements(element, leafElements, wrappedCells);

  // Phase 2: Measure all elements (reads only - triggers one reflow)
  const elements = measureElements(leafElements, wrappedCells, parentRect);

  // Phase 3: Clean up temporary wrappers (writes only)
  cleanupWrappedCells(wrappedCells);

  return elements;
}

function collectLeafElements(
  element: Element,
  leafElements: LeafElement[],
  wrappedCells: WrappedCell[]
): void {
  // ... traverse DOM tree ...

  const isTableCell = tag === 'td' || tag === 'th';
  if (isTableCell && hasOnlyTextContent(element)) {
    // Wrap text in span for measurement
    const span = document.createElement('span');
    span.style.display = 'inline';
    
    while (element.firstChild) {
      span.appendChild(element.firstChild);
    }
    element.appendChild(span);
    
    // Store reference for Phase 2 measurement
    wrappedCells.push({ element, span, borderRadius });
  }
}

function measureElements(
  leafElements: LeafElement[],
  wrappedCells: WrappedCell[],
  parentRect: DOMRect
): ElementInfo[] {
  const elements: ElementInfo[] = [];

  // Measure regular leaf elements
  leafElements.forEach(({ element, borderRadius }) => {
    const rect = element.getBoundingClientRect();
    // ... store measurements ...
  });

  // Measure wrapped table cells
  wrappedCells.forEach(({ span, borderRadius }) => {
    const rect = span.getBoundingClientRect();
    // ... store measurements ...
  });

  return elements;
}

function cleanupWrappedCells(wrappedCells: WrappedCell[]): void {
  wrappedCells.forEach(({ element, span }) => {
    // Restore original text nodes
    while (span.firstChild) {
      element.insertBefore(span.firstChild, span);
    }
    element.removeChild(span);
  });
}`}</code>
        </pre>

        <p>
          The key insight is that <strong>batching DOM operations by type</strong> (all writes, then
          all reads, then all cleanup) prevents layout thrashing. The browser only needs to
          recalculate layout once - at the start of Phase 2, after all span wrappers have been
          created. All subsequent measurements in Phase 2 use the cached layout, and the cleanup in
          Phase 3 happens after measurements are complete, so it doesn't affect the captured
          dimensions.
        </p>

        <p>
          This optimization is implemented in the <code>extractElementInfo</code> function in the
          core package, which means all framework adapters (React, Vue, Svelte, Angular, SolidJS)
          automatically benefit from this performance improvement. When the optimization was added,
          no adapter-specific changes were needed - the improved performance appeared across all
          frameworks immediately.
        </p>

        <p>
          The table cell edge case demonstrates a broader principle:{' '}
          <strong>
            performance optimizations in DOM manipulation often come from careful batching of
            operations
          </strong>
          . By separating writes from reads and processing elements in batches rather than
          sequentially, we can achieve dramatic performance improvements - in this case, reducing
          dozens of potential reflows down to just one.
        </p>
      </article>
    </DocsLayout>
  );
}
