# Migration Guide

---

## v1.x → v2.0.0 (Svelte 5 Migration)

### Overview

Version 2.0.0 migrates the Svelte adapter to **Svelte 5**. This is a **breaking change** for Svelte users.

### Who Is Affected?

- **Svelte users**: Must upgrade to Svelte 5
- **React users**: No changes required
- **Vue users**: No changes required

### Breaking Changes

1. **Svelte 4 is no longer supported**
   - Peer dependency changed from `^4.0.0 || ^5.0.0` to `^5.0.0`

2. **App mounting syntax changed**

   ```diff
   - import App from './App.svelte';
   - const app = new App({ target: document.getElementById('app') });

   + import { mount } from 'svelte';
   + import App from './App.svelte';
   + const app = mount(App, { target: document.getElementById('app') });
   ```

3. **Component props syntax changed** (if you're extending Shimmer)

   ```diff
   - export let loading = true;
   - export let shimmerColor = undefined;

   + let { loading = true, shimmerColor = undefined } = $props();
   ```

4. **Reactive state syntax changed** (in your own components)

   ```diff
   - let isLoading = true;

   + let isLoading = $state(true);
   ```

### Migration Steps for Svelte Projects

1. **Update dependencies**

   ```bash
   npm install svelte@^5.0.0 @sveltejs/vite-plugin-svelte@^4.0.0 svelte-check@^4.0.0
   ```

2. **Update your `main.ts`** (if using the old mounting syntax)

   ```typescript
   import { mount } from 'svelte';
   import App from './App.svelte';

   mount(App, { target: document.getElementById('app')! });
   ```

3. **Update your components** to use Svelte 5 runes (optional but recommended)
   - `export let prop` → `let { prop } = $props()`
   - `let x = value` → `let x = $state(value)`
   - `$: derived = ...` → `const derived = $derived(...)`
   - `$: { ... }` → `$effect(() => { ... })`

### Staying on Svelte 4?

If you cannot upgrade to Svelte 5, pin your dependency to v1.x:

```bash
npm install @shimmer-from-structure/svelte@^1.1.0
```

---

# Migration Guide: v0.7.0 → v1.0.0

## Overview

Version 1.0.0 introduces a **monorepo structure** with support for **both React and Vue**. This guide will help you migrate from the previous single-package version.

## ✅ Good News: Fully Backward Compatible!

**For React users**, the migration is seamless:

- Your existing code will continue to work without changes
- All imports remain the same (`'shimmer-from-structure'`)
- No breaking changes to the API
- **No action required!**

## What Changed?

### Package Structure

**Before (v0.7.0):**

```
shimmer-from-structure/
├── src/
│   ├── Shimmer.tsx
│   ├── ShimmerContext.tsx
│   └── types.ts
└── package.json
```

**After (v1.0.0):**

```
shimmer-from-structure/
├── packages/
│   ├── core/                    # Framework-agnostic
│   ├── react/                   # React adapter
│   ├── vue/                     # Vue adapter (NEW!)
│   └── shimmer-from-structure/  # Main package (re-exports React)
```

## Import Paths

### React Projects

**No changes needed!** The main package continues to provide the React adapter for backward compatibility:

```tsx
// This still works exactly as before
import { Shimmer, ShimmerProvider } from 'shimmer-from-structure';
```

**For Vue users (new):**

```vue
// Use the Vue-specific package import { Shimmer, provideShimmerConfig } from
'@shimmer-from-structure/vue';
```

**Advanced: Explicit imports** (optional for React users who want to be specific):

```tsx
// React - explicit import
import type { ShimmerConfig } from '@shimmer-from-structure/react';
import { Shimmer } from '@shimmer-from-structure/react';

// Or use subpath export from main package
import { Shimmer } from 'shimmer-from-structure/vue';
```

## Migration Steps

### For React Projects

#### No Action Required! ✅

Your existing code works as-is. The main `shimmer-from-structure` package continues to provide the React adapter.

```bash
# Just update to the latest version
npm update shimmer-from-structure
```

That's it! Your imports and code remain unchanged.

#### Optional: Use Explicit Imports (Recommended for Clarity)

If you want to be explicit about using the React adapter:

```diff
- import { Shimmer, ShimmerProvider } from 'shimmer-from-structure';
+ import { Shimmer, ShimmerProvider } from '@shimmer-from-structure/react';
```

But this is **entirely optional** - the old import still works!

### For Vue Projects (NEW!)

If you're starting fresh with Vue:

```bash
npm install shimmer-from-structure
```

```vue
<script setup>
import { Shimmer } from 'shimmer-from-structure/vue';
// or auto-detect: import { Shimmer } from 'shimmer-from-structure';
</script>
```

See [VUE_README.md](./VUE_README.md) for complete Vue documentation.

## API Changes

### No Breaking Changes! ✅

All existing APIs remain the same:

- `<Shimmer>` component - same props
- `<ShimmerProvider>` - same API
- `useShimmerConfig` - same hook
- All configuration options - identical

### New Additions (Vue)

Vue users get equivalent APIs:

- `<Shimmer>` component (with Vue slots)
- `provideShimmerConfig()` function
- `useShimmerConfig()` composable

## Troubleshooting

### TypeScript errors after upgrade

**Issue:** Type errors or missing IntelliSense

**Solution:** Clear your TypeScript cache and restart your IDE:

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Monorepo Structure Benefits

### For Contributors

Each package can be developed/tested independently:

```bash
npm run build:core    # Build core utilities
npm run build:react   # Build React adapter
npm run build:vue     # Build Vue adapter
npm run build:main    # Build main package
```

### For Users

- **Smaller bundles**: Only the code for your framework is included
- **Better tree-shaking**: Framework-agnostic core is shared
- **Explicit dependencies**: Clear separation between frameworks

## Package Sizes

Compared to v0.7.0, the packages are now smaller and more modular:

| Package                         | Size (ESM) | What's Included            |
| ------------------------------- | ---------- | -------------------------- |
| `@shimmer-from-structure/core`  | 1.44 kB    | DOM measurement logic      |
| `@shimmer-from-structure/react` | 12.84 kB   | React-specific code + core |
| `@shimmer-from-structure/vue`   | 3.89 kB    | Vue-specific code + core   |

**Before (v0.7.0):** ~13 kB for React (with duplicated code)  
**After (v1.0.0):** ~12.84 kB for React (optimized structure)

## Questions?

- **React users**: No action needed! Your code continues to work.
- **Vue users**: See [VUE_README.md](./VUE_README.md)
- **Issues**: Open a [GitHub issue](https://github.com/darula-hpp/shimmer-from-structure/issues)

Happy shimmer-ing! ✨
