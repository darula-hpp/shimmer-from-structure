# ✨ Shimmer From Structure

A **React, Vue & Svelte** shimmer/skeleton library that **automatically adapts to your component's runtime structure**. Unlike traditional shimmer libraries that require pre-defined skeleton structures, this library analyzes your actual component's DOM at runtime and generates a shimmer effect that perfectly matches its layout.

![React](https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vue](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![Svelte](https://img.shields.io/badge/Svelte-ff3e00?style=for-the-badge&logo=svelte&logoColor=white)

![Shimmer From Structure Demo](https://github.com/darula-hpp/shimmer-from-structure/raw/main/example/preview.gif)

## Why This Library?

Traditional shimmer libraries require you to:

- Manually create skeleton components that mirror your real components
- Maintain two versions of each component (real + skeleton)
- Update skeletons every time your layout changes

**Shimmer From Structure** eliminates all of that:

- ✅ **Works with React, Vue & Svelte** - Simple, framework-specific drivers
- ✅ Automatically measures your component's structure at runtime
- ✅ Generates shimmer effects that match actual dimensions
- ✅ Zero maintenance - works with any layout changes
- ✅ Works with complex nested structures
- ✅ Supports dynamic data with `templateProps`
- ✅ Preserves container backgrounds during loading
- ✅ Auto-detects border-radius from your CSS

## Installation

```bash
npm install shimmer-from-structure
# or
yarn add shimmer-from-structure
# or
pnpm add shimmer-from-structure
```

## 🎯 Framework Support

Shimmer From Structure provides dedicated packages for **React and Vue**.

### React

React support is built-in to the main package for backward compatibility:

```javascript
// React projects (or @shimmer-from-structure/react)
import { Shimmer } from 'shimmer-from-structure';
```

### Vue 3

Vue support requires importing from the specific adapter:

```javascript
// Vue 3 projects
import { Shimmer } from '@shimmer-from-structure/vue';
```

### Svelte

Svelte support is provided via its own adapter:

```javascript
// Svelte projects
import { Shimmer } from '@shimmer-from-structure/svelte';
```

---

# 📖 Basic Usage

## React

### Static Content

For components with hardcoded/static content:

```tsx
import { Shimmer } from 'shimmer-from-structure';

function UserCard() {
  return (
    <Shimmer loading={isLoading}>
      <div className="card">
        <img src="avatar.jpg" className="avatar" />
        <h2>John Doe</h2>
        <p>Software Engineer</p>
      </div>
    </Shimmer>
  );
}
```

## Vue

### Static Content

```vue
<script setup>
import { ref } from 'vue';
import { Shimmer } from '@shimmer-from-structure/vue';

const isLoading = ref(true);
</script>

<template>
  <Shimmer :loading="isLoading">
    <div class="card">
      <img src="avatar.jpg" class="avatar" />
      <h2>John Doe</h2>
      <p>Software Engineer</p>
    </div>
  </Shimmer>
</template>
```

## Svelte

### Static Content

```svelte
<script>
import { Shimmer } from '@shimmer-from-structure/svelte';

let isLoading = $state(true);
</script>

<Shimmer loading={isLoading}>
  <div class="card">
    <img src="avatar.jpg" class="avatar" />
    <h2>John Doe</h2>
    <p>Software Engineer</p>
  </div>
</Shimmer>
```

---

### Dynamic Content with `templateProps`

For components that receive dynamic data via props, use `templateProps` to provide mock data for skeleton generation:

**React**

```tsx
import { Shimmer } from 'shimmer-from-structure';

// Your component that accepts props
const UserCard = ({ user }) => (
  <div className="card">
    <img src={user.avatar} className="avatar" />
    <h2>{user.name}</h2>
    <p>{user.role}</p>
  </div>
);

// Template data for the skeleton
const userTemplate = {
  name: 'Loading...',
  role: 'Loading role...',
  avatar: 'placeholder.jpg',
};

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  return (
    <Shimmer loading={loading} templateProps={{ user: userTemplate }}>
      <UserCard user={user || userTemplate} />
    </Shimmer>
  );
}
```

**Vue**

```vue
<script setup>
import { ref } from 'vue';
import { Shimmer } from '@shimmer-from-structure/vue';
import UserCard from './UserCard.vue';

const loading = ref(true);
const userTemplate = {
  name: 'Loading...',
  role: 'Loading role...',
  avatar: 'placeholder.jpg',
};
</script>

<template>
  <Shimmer :loading="loading" :templateProps="{ user: userTemplate }">
    <UserCard :user="user || userTemplate" />
  </Shimmer>
</template>
```

**Svelte**

```svelte
<script>
import { Shimmer } from '@shimmer-from-structure/svelte';
import UserCard from './UserCard.svelte';

let { user } = $props();
let loading = $state(true);

const userTemplate = {
  name: 'Loading...',
  role: 'Loading role...',
  avatar: 'placeholder.jpg',
};
</script>

<Shimmer loading={loading} templateProps={{ user: userTemplate }}>
  <UserCard user={user || userTemplate} />
</Shimmer>
```

The `templateProps` object is spread onto the first child component when loading, allowing it to render with mock data for measurement.

## 🎨 API Reference

### `<Shimmer>` Props

| Prop                   | Type                      | Default                    | Description                                               |
| ---------------------- | ------------------------- | -------------------------- | --------------------------------------------------------- |
| `loading`              | `boolean`                 | `true`                     | Whether to show shimmer effect or actual content          |
| `children`             | `React.ReactNode`         | required                   | The content to render/measure                             |
| `shimmerColor`         | `string`                  | `'rgba(255,255,255,0.15)'` | Color of the shimmer wave                                 |
| `backgroundColor`      | `string`                  | `'rgba(255,255,255,0.08)'` | Background color of shimmer blocks                        |
| `duration`             | `number`                  | `1.5`                      | Animation duration in seconds                             |
| `fallbackBorderRadius` | `number`                  | `4`                        | Border radius (px) for elements with no CSS border-radius |
| `templateProps`        | `Record<string, unknown>` | -                          | Props to inject into first child for skeleton rendering   |

### Example with All Props

**React**

```tsx
<Shimmer
  loading={isLoading}
  shimmerColor="rgba(255, 255, 255, 0.2)"
  backgroundColor="rgba(255, 255, 255, 0.1)"
  duration={2}
  fallbackBorderRadius={8}
  templateProps={{
    user: userTemplate,
    settings: settingsTemplate,
  }}
>
  <MyComponent user={user} settings={settings} />
</Shimmer>
```

**Vue**

```vue
<Shimmer
  :loading="isLoading"
  shimmerColor="rgba(255, 255, 255, 0.2)"
  backgroundColor="rgba(255, 255, 255, 0.1)"
  :duration="2"
  :fallbackBorderRadius="8"
  :templateProps="{
    user: userTemplate,
    settings: settingsTemplate,
  }"
>
  <MyComponent :user="user" :settings="settings" />
</Shimmer>
```

**Svelte**

```svelte
<Shimmer
  loading={isLoading}
  shimmerColor="rgba(255, 255, 255, 0.2)"
  backgroundColor="rgba(255, 255, 255, 0.1)"
  duration={2}
  fallbackBorderRadius={8}
  templateProps={{
    user: userTemplate,
    settings: settingsTemplate,
  }}
>
  <MyComponent {user} {settings} />
</Shimmer>
```

## 🔧 How It Works

1. **Visible Container Rendering**: When `loading={true}`, your component renders with transparent text but **visible container backgrounds**
2. **Template Props Injection**: If `templateProps` is provided, it's spread onto the first child so dynamic components can render
3. **DOM Measurement**: Uses `useLayoutEffect` to synchronously measure all leaf elements via `getBoundingClientRect()`
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

**React**

```tsx
function Dashboard() {
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);

  return (
    <>
      {/* User profile section */}
      <Shimmer loading={loadingUser} templateProps={{ user: userTemplate }}>
        <UserProfile user={user} />
      </Shimmer>

      {/* Stats section - with custom colors */}
      <Shimmer
        loading={loadingStats}
        templateProps={{ stats: statsTemplate }}
        shimmerColor="rgba(20, 184, 166, 0.2)"
      >
        <StatsGrid stats={stats} />
      </Shimmer>
    </>
  );
}
```

**Vue**

```vue
<template>
  <!-- User profile section -->
  <Shimmer :loading="loadingUser" :templateProps="{ user: userTemplate }">
    <UserProfile :user="user" />
  </Shimmer>

  <!-- Stats section - with custom colors -->
  <Shimmer
    :loading="loadingStats"
    :templateProps="{ stats: statsTemplate }"
    shimmerColor="rgba(20, 184, 166, 0.2)"
  >
    <StatsGrid :stats="stats" />
  </Shimmer>
</template>
```

**Svelte**

```svelte
<Shimmer loading={loadingUser} templateProps={{ user: userTemplate }}>
  <UserProfile {user} />
</Shimmer>

<Shimmer
  loading={loadingStats}
  templateProps={{ stats: statsTemplate }}
  shimmerColor="rgba(20, 184, 166, 0.2)"
>
  <StatsGrid {stats} />
</Shimmer>
```

### Transactions List

**React**

```tsx
<Shimmer loading={loadingTransactions} templateProps={{ transactions: transactionsTemplate }}>
  <TransactionsList transactions={transactions} />
</Shimmer>
```

**Vue**

```vue
<Shimmer :loading="loadingTransactions" :templateProps="{ transactions: transactionsTemplate }">
  <TransactionsList :transactions="transactions" />
</Shimmer>
```

**Svelte**

```svelte
<Shimmer loading={loadingTransactions} templateProps={{ transactions: transactionsTemplate }}>
  <TransactionsList {transactions} />
</Shimmer>
```

### Team Members Grid

**React**

```tsx
<Shimmer loading={loadingTeam} templateProps={{ members: teamTemplate }}>
  <TeamMembers members={team} />
</Shimmer>
```

**Vue**

```vue
<Shimmer :loading="loadingTeam" :templateProps="{ members: teamTemplate }">
  <TeamMembers :members="team" />
</Shimmer>
```

**Svelte**

```svelte
<Shimmer loading={loadingTeam} templateProps={{ members: teamTemplate }}>
  <TeamMembers members={team} />
</Shimmer>
```

## 🔄 Using with React Suspense

Shimmer works seamlessly as a Suspense fallback. When used this way, `loading` is always `true` because React automatically unmounts the fallback and replaces it with the resolved component.

### Basic Suspense Pattern

```tsx
import { Suspense, lazy } from 'react';
import { Shimmer } from 'shimmer-from-structure';

const UserProfile = lazy(() => import('./UserProfile'));

function App() {
  return (
    <Suspense
      fallback={
        <Shimmer loading={true} templateProps={{ user: userTemplate }}>
          <UserProfile />
        </Shimmer>
      }
    >
      <UserProfile userId="123" />
    </Suspense>
  );
}
```

### Why `loading={true}` is Always Set

When using Shimmer as a Suspense fallback:

1. **Suspend**: React renders the fallback → Shimmer shows with `loading={true}`
2. **Resolve**: React **replaces** the entire fallback with the real component
3. The Shimmer is **unmounted**, not updated — so you never need to toggle `loading`

### Performance Tips for Suspense

**Memoize the fallback** to prevent re-renders:

```tsx
const ShimmerFallback = React.memo(() => (
  <Shimmer loading={true} templateProps={{ user: userTemplate }}>
    <UserProfile />
  </Shimmer>
));

// Usage
<Suspense fallback={<ShimmerFallback />}>
  <UserProfile userId="123" />
</Suspense>;
```

**Keep templates lightweight** — the DOM is measured synchronously via `useLayoutEffect`, so avoid complex logic in your template.

## Global Configuration

You can set default configuration for your entire app (or specific sections) using the context/provider pattern. This is perfect for maintaining consistent themes without repeating props.

### React (Context API)

```tsx
import { Shimmer, ShimmerProvider } from '@shimmer-from-structure/react';

function App() {
  return (
    // Set global defaults
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

### Vue (Provide/Inject)

```vue
<!-- App.vue -->
<script setup>
import { provideShimmerConfig } from '@shimmer-from-structure/vue';

provideShimmerConfig({
  shimmerColor: 'rgba(56, 189, 248, 0.4)',
  backgroundColor: 'rgba(56, 189, 248, 0.1)',
  duration: 2.5,
  fallbackBorderRadius: 8,
});
</script>

<template>
  <router-view />
</template>
```

### Svelte (setShimmerConfig)

```svelte
<!-- App.svelte or any parent component -->
<script>
import { setShimmerConfig } from '@shimmer-from-structure/svelte';
import Dashboard from './Dashboard.svelte';

// Must be called at the top level during component initialization
setShimmerConfig({
  shimmerColor: 'rgba(56, 189, 248, 0.4)',
  backgroundColor: 'rgba(56, 189, 248, 0.1)',
  duration: 2.5,
  fallbackBorderRadius: 8,
});
</script>

<Dashboard />
```

---

Components inside the provider automatically inherit values. You can still override them locally:

**React**

```tsx
// Inherits blue theme from provider
<Shimmer loading={true}><UserCard /></Shimmer>

// Overrides provider settings
<Shimmer loading={true} duration={0.5}><FastCard /></Shimmer>
```

**Vue**

```vue
<!-- Inherits blue theme from provider -->
<Shimmer :loading="true"><UserCard /></Shimmer>

<!-- Overrides provider settings -->
<Shimmer :loading="true" :duration="0.5"><FastCard /></Shimmer>
```

**Svelte**

```svelte
<!-- Inherits blue theme from provider -->
<Shimmer loading={true}><UserCard /></Shimmer>

<!-- Overrides provider settings -->
<Shimmer loading={true} duration={0.5}><FastCard /></Shimmer>
```

### Accessing Config in Hooks/Composables

If you need to access the current configuration in your own components:

**React**

```tsx
import { useShimmerConfig } from 'shimmer-from-structure';

function MyComponent() {
  const config = useShimmerConfig();
  return <div style={{ background: config.backgroundColor }}>...</div>;
}
```

**Vue**

```javascript
import { useShimmerConfig } from '@shimmer-from-structure/vue';

const config = useShimmerConfig();
console.log(config.value.backgroundColor);
```

**Svelte**

```javascript
import { getShimmerConfig } from '@shimmer-from-structure/svelte';

const config = getShimmerConfig();
console.log(config.backgroundColor);
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
<Shimmer loading={loadingUsers}><UserList /></Shimmer>
<Shimmer loading={loadingPosts}><PostList /></Shimmer>

// ❌ Avoid - all-or-nothing loading
<Shimmer loading={loadingUsers || loadingPosts}>
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

### 5. Provide Container Dimensions

For async components (like charts), ensure containers have explicit dimensions so shimmer has something to measure.

## ⚡ Performance Considerations

- Measurement happens only when `loading` changes to `true`
- Uses `useLayoutEffect` for synchronous measurement (no flicker)
- Minimal re-renders - only updates when loading state or children change
- Lightweight DOM measurements using native browser APIs

- Lightweight DOM measurements using native browser APIs

## 🛠️ Development

This is a monorepo managed with npm workspaces. Each package can be built independently:

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Build individual packages
npm run build:core
npm run build:react
npm run build:vue
npm run build:svelte
npm run build:main

# Run tests
npm test
```

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Known Limitations

- **Async components**: Components that render asynchronously (like charts using `ResponsiveContainer`) may need explicit container dimensions
- **Zero-dimension elements**: Elements with `display: none` or zero dimensions won't be captured
- **SVG internals**: Only the outer `<svg>` element is captured, not internal paths/shapes

## 🏗️ Monorepo Structure

This library is organized as a monorepo with four packages:

| Package                          | Description                                 | Size     |
| -------------------------------- | ------------------------------------------- | -------- |
| `@shimmer-from-structure/core`   | Framework-agnostic DOM utilities            | 1.44 kB  |
| `@shimmer-from-structure/react`  | React adapter                               | 12.84 kB |
| `@shimmer-from-structure/vue`    | Vue 3 adapter                               | 3.89 kB  |
| `@shimmer-from-structure/svelte` | Svelte adapter                              | 4.60 kB  |
| `shimmer-from-structure`         | Main package (React backward compatibility) | 0.93 kB  |

The core package contains all DOM measurement logic, while React and Vue packages are thin wrappers that provide framework-specific APIs.

## 🚧 Roadmap

- [x] Dynamic data support via `templateProps`
- [x] Auto border-radius detection
- [x] Container background visibility
- [x] **Vue.js adapter**
- [x] **Svelte adapter**
- [ ] Better async component support
- [ ] Customizable shimmer direction (vertical, diagonal)
- [ ] React Native support

---

Made with ❤️ for developers tired of maintaining skeleton screens
