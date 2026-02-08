# ✨ Shimmer From Structure - SolidJS Adapter

A **SolidJS** shimmer/skeleton library that **automatically adapts to your component's runtime structure**. Unlike traditional shimmer libraries that require pre-defined skeleton structures, this library analyzes your actual component's DOM at runtime and generates a shimmer effect that perfectly matches its layout.

![SolidJS](https://img.shields.io/badge/SolidJS-%2335495e?style=for-the-badge&logo=solid&logoColor=%234FC08D)

## Installation

```bash
npm install @shimmer-from-structure/solid
# or
yarn add @shimmer-from-structure/solid
# or
pnpm add @shimmer-from-structure/solid
```

## Quick Start

```tsx
import { Shimmer } from '@shimmer-from-structure/solid';
import { createSignal } from 'solid-js';

function UserCard() {
  const [loading, setLoading] = createSignal(true);

  return (
    <Shimmer loading={loading()}>
      <div class="card">
        <img src="avatar.jpg" class="avatar" />
        <h2>John Doe</h2>
        <p>Software Engineer</p>
      </div>
    </Shimmer>
  );
}
```

## Features

✅ Built with modern SolidJS primitives (`createSignal`, `createEffect`, `Show`, `For`)  
✅ Automatically measures your component's structure at runtime  
✅ Generates shimmer effects that match actual dimensions  
✅ Zero maintenance - works with any layout changes  
✅ Works with complex nested structures  
✅ Supports dynamic data with `templateProps`  
✅ Preserves container backgrounds during loading  
✅ Auto-detects border-radius from your CSS

## Basic Usage

### Static Content

For components with hardcoded/static content:

```tsx
import { Shimmer } from '@shimmer-from-structure/solid';

function UserCard() {
  return (
    <Shimmer loading={isLoading()}>
      <div class="card">
        <img src="avatar.jpg" class="avatar" />
        <h2>John Doe</h2>
        <p>Software Engineer</p>
      </div>
    </Shimmer>
  );
}
```

### Dynamic Content with Template Data

**Important: SolidJS Pattern**  
Unlike React/Vue where `templateProps` automatically injects data, SolidJS uses an **explicit, developer-controlled** approach. You pass the template data directly to your child components using conditionals (e.g., `user() || userTemplate`). This is **more idiomatic** for SolidJS because:

- ✅ **Explicit over implicit** - you see exactly what data is being used
- ✅ **Type-safe** - TypeScript can infer correct types
- ✅ **No magic** - no hidden element cloning

The `templateProps` parameter exists for **API consistency** across frameworks and for **documentation purposes**, but you control the data flow yourself.

```tsx
import { Shimmer } from '@shimmer-from-structure/solid';
import { createSignal } from 'solid-js';
import type { Component } from 'solid-js';

interface User {
  name: string;
  role: string;
  avatar: string;
}

// Your component that accepts props
const UserCard: Component<{ user: User }> = (props) => (
  <div class="card">
    <img src={props.user.avatar} class="avatar" />
    <h2>{props.user.name}</h2>
    <p>{props.user.role}</p>
  </div>
);

// Template data for the skeleton
const userTemplate: User = {
  name: 'Loading...',
  role: 'Loading role...',
  avatar: 'placeholder.jpg',
};

function App() {
  const [loading, setLoading] = createSignal(true);
  const [user, setUser] = createSignal<User | null>(null);

  return (
    <Shimmer loading={loading()}>
      <UserCard user={user() || userTemplate} />
    </Shimmer>
  );
}
```

**Pattern Summary:**

```tsx
// ✅ SolidJS way: explicit conditional (templateProps is optional)
<Shimmer loading={loading()}>
  <MyComponent data={realData() || template} />
</Shimmer>

// Also valid (for API consistency with other frameworks)
<Shimmer loading={loading()} templateProps={{ data: template }}>
  <MyComponent data={realData() || template} />
</Shimmer>
```

> **Note:** The `templateProps` parameter exists for API consistency with React/Vue/Angular, but it's **not required** in SolidJS. You control the data flow directly with conditionals, which is more idiomatic.

## API Reference

### `<Shimmer>` Props

| Prop                   | Type                      | Default                       | Description                                               |
| ---------------------- | ------------------------- | ----------------------------- | --------------------------------------------------------- |
| `loading`              | `boolean`                 | `true`                        | Whether to show shimmer effect or actual content          |
| `children`             | `JSX.Element`             | required                      | The content to render/measure                             |
| `shimmerColor`         | `string`                  | `'rgba(255, 255, 255, 0.3)'`  | Color of the shimmer wave                                 |
| `backgroundColor`      | `string`                  | `'rgba(255, 255, 255, 0.08)'` | Background color of shimmer blocks                        |
| `duration`             | `number`                  | `1.5`                         | Animation duration in seconds                             |
| `fallbackBorderRadius` | `number`                  | `4`                           | Border radius (px) for elements with no CSS border-radius |
| `templateProps`        | `Record<string, unknown>` | -                             | Props to inject into first child for skeleton rendering   |

### Example with All Props

```tsx
<Shimmer
  loading={isLoading()}
  shimmerColor="rgba(255, 255, 255, 0.2)"
  backgroundColor="rgba(255, 255, 255, 0.1)"
  duration={2}
  fallbackBorderRadius={8}
  templateProps={{
    user: userTemplate,
    settings: settingsTemplate,
  }}
>
  <MyComponent user={user()} settings={settings()} />
</Shimmer>
```

## How It Works

1. **Visible Container Rendering**: When `loading={true}`, your component renders with transparent text but **visible container backgrounds**
2. **Template Props Injection**: If `templateProps` is provided, it's passed to the child so dynamic components can render
3. **DOM Measurement**: Uses `createEffect` to reactively measure all leaf elements via `getBoundingClientRect()`
4. **Border Radius Detection**: Automatically captures each element's computed `border-radius` from CSS
5. **Shimmer Generation**: Creates absolutely-positioned shimmer blocks matching measured dimensions
6. **Animation**: Applies smooth gradient animation that sweeps across each block

### Key Features

- **Container backgrounds visible**: Unlike `opacity: 0`, we use `color: transparent` so card backgrounds/borders show during loading
- **Auto border-radius**: Circular avatars get circular shimmer blocks automatically
- **Fallback radius**: Text elements (which have `border-radius: 0`) use `fallbackBorderRadius` to avoid sharp rectangles
- **Dark-mode friendly**: Default colors use semi-transparent whites that work on any background

## Examples

### Dashboard with Multiple Sections

Each section can have its own independent loading state:

```tsx
import { createSignal, For } from 'solid-js';
import { Shimmer } from '@shimmer-from-structure/solid';

function Dashboard() {
  const [loadingUser, setLoadingUser] = createSignal(true);
  const [loadingStats, setLoadingStats] = createSignal(true);

  return (
    <>
      {/* User profile section */}
      <Shimmer loading={loadingUser()} templateProps={{ user: userTemplate }}>
        <UserProfile user={user()} />
      </Shimmer>

      {/* Stats section - with custom colors */}
      <Shimmer
        loading={loadingStats()}
        templateProps={{ stats: statsTemplate }}
        shimmerColor="rgba(20, 184, 166, 0.2)"
      >
        <StatsGrid stats={stats()} />
      </Shimmer>
    </>
  );
}
```

### Using with For Component

```tsx
<Shimmer loading={loadingTeam()} templateProps={{ members: teamTemplate }}>
  <div class="team-members">
    <h3>Team</h3>
    <div class="members-grid">
      <For each={members()}>
        {(member) => (
          <div class="member-card">
            <img src={member.avatar} alt={member.name} />
            <p>{member.name}</p>
            <span>{member.role}</span>
          </div>
        )}
      </For>
    </div>
  </div>
</Shimmer>
```

## Global Configuration

You can set default configuration for your entire app (or specific sections) using the `ShimmerProvider`. This is perfect for maintaining consistent themes without repeating props.

```tsx
import { Shimmer, ShimmerProvider } from '@shimmer-from-structure/solid';

function App() {
  return (
    <ShimmerProvider
      config={{
        shimmerColor: 'rgba(56, 189, 248, 0.4)', // Blue shimmer
        backgroundColor: 'rgba(56, 189, 248, 0.1)', // Blue background
        duration: 2.5,
        fallbackBorderRadius: 8,
      }}
    >
      <Dashboard />
    </ShimmerProvider>
  );
}
```

Components inside the provider automatically inherit values. You can still override them locally:

```tsx
// Inherits blue theme from provider
<Shimmer loading={true()}><UserCard /></Shimmer>

// Overrides provider settings
<Shimmer loading={true()} duration={0.5}><FastCard /></Shimmer>
```

### Accessing Config Programmatically

```tsx
import { useShimmerConfig } from '@shimmer-from-structure/solid';

function MyComponent() {
  const config = useShimmerConfig();
  return <div style={{ background: config.backgroundColor }}>...</div>;
}
```

## Best Practices

### 1. Use `templateProps` for Dynamic Data

When your component receives data via props, always provide `templateProps` with mock data that matches the expected structure.

### 2. Match Template Structure to Real Data

Ensure your template data has the same array length and property structure as real data for accurate shimmer layout.

### 3. Use Individual Shimmer Components

Wrap each section in its own Shimmer for independent loading states:

```tsx
// ✅ Good - independent loading
<Shimmer loading={loadingUsers()}><UserList /></Shimmer>
<Shimmer loading={loadingPosts()}><PostList /></Shimmer>

// ❌ Avoid - all-or-nothing loading
<Shimmer loading={loadingUsers() || loadingPosts()}>
  <UserList />
  <PostList />
</Shimmer>
```

### 4. Consider Element Widths

Block elements like `<h1>`, `<p>` take full container width. If you want shimmer to match text width:

```css
.title {
  width: fit-content;
}
```

## SolidJS-Specific Features

### Reactive Measurement

The shimmer automatically re-measures when content changes thanks to SolidJS's reactive `createEffect`:

```tsx
const [data, setData] = createSignal([]);

// Shimmer adapts when data changes
<Shimmer loading={loading()}>
  <For each={data()}>{(item) => <div>{item.name}</div>}</For>
</Shimmer>;
```

### Performance

- Measurement happens only when `loading()` signal changes to `true`
- Uses `createEffect` for efficient reactive measurement
- Minimal re-renders thanks to SolidJS's fine-grained reactivity
- Automatic cleanup with `onCleanup`

## TypeScript Support

Full TypeScript support with proper type definitions:

```tsx
import type { Component } from 'solid-js';
import type { ShimmerProps, ShimmerConfig } from '@shimmer-from-structure/solid';

const MyShimmer: Component<ShimmerProps> = (props) => {
  // Fully typed props
};
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Part of the [shimmer-from-structure](https://github.com/darula-hpp/shimmer-from-structure) monorepo.
