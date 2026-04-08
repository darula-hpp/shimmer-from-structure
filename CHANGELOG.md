# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.4.4] - 2026-04-08

### Fixed

- **Core: `data-shimmer-no-children` Visual Rendering**: Fixed an issue where child element backgrounds, borders, and shadows remained visible when using `data-shimmer-no-children`, causing the single shimmer block overlay to appear incomplete.
  - Added CSS rule to make backgrounds, borders, and box-shadows transparent for all children inside `[data-shimmer-no-children]` elements.
  - Ensures the shimmer overlay fully covers the parent element without child styling showing through.
  - Particularly noticeable in flex/grid containers with styled children (e.g., badge groups, button rows).

## [2.4.3] - 2026-04-08

### Performance

- **Core: Layout Thrashing Elimination**: Refactored `extractElementInfo` to batch DOM operations and minimize reflows.
  - Implemented a 3-phase approach: collect elements (writes only), measure all elements (reads only - triggers one reflow), cleanup temporary wrappers (writes only).
  - Previously, the function interleaved reads (`getBoundingClientRect`) and writes (DOM mutations) during recursion, causing N reflows for N table cells.
  - Now defers all measurements until after DOM modifications are complete, reducing N reflows to 1 for the entire tree.
  - Zero-dimension element filtering moved from Phase 1 to Phase 2 to maintain pure write-only collection phase.
  - Benefits all framework adapters (React, Vue, Svelte, Angular, SolidJS) automatically.

## [2.4.2] - 2026-03-21

### Fixed

- **Build: CommonJS/ESM Module Resolution**: Fixed "Named export not found" errors when importing from `@shimmer-from-structure/core` in Vite SSR environments.
  - Changed build output from UMD to proper CommonJS format with `.cjs` extension
  - Added `"type": "module"` to all package.json files for explicit ESM declaration
  - Updated package exports to correctly map `require` to `.cjs` and `import` to `.esm.js`
  - Ensures Vite's SSR module runner correctly resolves ES module imports instead of falling back to CommonJS
  - Affects all framework adapters: React, Vue, Svelte, Solid, and Angular

## [2.4.1] - 2026-03-16

### Fixed

- **React: ReactCurrentDispatcher Conflict**: Resolved a common `TypeError` in React environments by correctly externalizing `react/jsx-runtime` and `react/jsx-dev-runtime` in the build process. This prevents React internals from being bundled into the library, avoiding conflicts with the host application's React instance.
- **Build: Global Mapping Warnings**: Added explicit global mappings for React JSX runtimes in the Vite configuration, resolving build-time warnings about missing global names.

## [2.4.0] - 2026-03-15

### Added

- **Core: HTML attribute controls for shimmer flow**
  - **`data-shimmer-ignore`**: Excludes the element and all its descendants from shimmer measurement and rendering. Elements with this attribute (and their children) are not measured, no shimmer blocks are drawn over them, and their text and media remain visible during loading (they are excluded from the “transparent text” styling).
  - **`data-shimmer-no-children`**: Treats the element as a single shimmer block; the library does not recurse into its children and uses the element’s own bounding rect for the overlay.
  - **`SHIMMER_CONTAINER_STYLES`**: New export from `@shimmer-from-structure/core` containing the CSS string used for the measure container (transparent text, hidden media). The rules exclude `[data-shimmer-ignore]` and `[data-shimmer-ignore] *` so ignored regions stay visible. All adapters use this constant for consistent behavior and a single place to maintain selector logic.

### Changed

- **React, Vue, Svelte, Angular, Solid**: Shimmer measure-container styles now use `SHIMMER_CONTAINER_STYLES` from core instead of inline or duplicated CSS. This keeps `data-shimmer-ignore` behavior (visibility during loading) consistent across adapters and centralizes future style changes in core.

### Added (examples)

- **React, Vue, Svelte, Angular examples**: New “HTML Attribute Controls” demo section showing `data-shimmer-ignore` (e.g. a visible “LIVE” badge during shimmer) and `data-shimmer-no-children` (one block for a metric row instead of per-child blocks).

### Fixed

- **Angular example**: Added `ts-morph` as a devDependency so `@analogjs/vite-plugin-angular` resolves correctly when running the Vite dev server (`npm run dev`).

## [2.3.4] - 2026-03-03

### Security

- **Svelte: Security Vulnerability Patches**: Updated Svelte dependencies from `^5.0.0` to `^5.53.5` to address multiple security vulnerabilities:
  - **CVE-2026-27125**: Fixed prototype pollution in server-side rendering attribute spreading that could cause unexpected attributes in SSR output
  - **CVE-2026-27902**: Fixed XSS/HTML injection vulnerability where errors from `transformError` were not properly escaped before HTML embedding
  - **CVE-2025-15265**: Fixed XSS vulnerability via hydratable components
  - Updated both `peerDependencies` and `devDependencies` to ensure secure versions are used

### Changed

- **React: Resilient DOM Measurement**: `measureElements` now catches and logs unexpected errors from `extractElementInfo` and `getBoundingClientRect`, allowing the shimmer to degrade gracefully (no overlays rendered) rather than propagating exceptions up the call stack.

## [2.3.3] - 2026-02-25

### Fixed

- **React: Runtime Crash in React 18 / Next.js 14**: Fixed a `TypeError: Cannot read properties of undefined (reading 'recentlyCreatedOwnerStacks')` occurring in React 18 environments.
  - The issue was caused by the build process using React 19 as a development dependency, which resulted in the inclusion of React 19 specific internal properties in the production bundle.
  - Resolved by implementing workspace-level dependency overrides, pinning the React adapter's development environment to React 18.2.0.
  - This ensures a clean, backward-compatible bundle while maintaining React 19 support across the rest of the monorepo.

  ### Changed
  - **Vue: Resilient DOM Measurement**: `measureElements` now catches and logs unexpected errors from `extractElementInfo` and `getBoundingClientRect`, allowing the shimmer to degrade gracefully (no overlays rendered) rather than propagating exceptions up the call stack.

## [2.3.2] - 2026-02-21

### Fixed

- **Core: `<br>` Tag Handling in `isLeafElement`**: Elements containing both text and `<br />` tags (e.g. `<p>First line.<br />Second line.</p>`) are now correctly shimmered.
  - Previously, the presence of a `<br>` child caused the parent element to be skipped as a shimmer candidate, leaving it blank during the loading state.
  - `isLeafElement` now ignores void/formatting elements (`br`, `wbr`, `hr`) when deciding whether an element has real children, treating such containers as leaf content blocks.
  - The workaround of wrapping text in `<span className="block">` or removing `<br>` tags is no longer required.

## [2.3.1] - 2026-02-10

### Fixed

- **Angular: Publishing Outcome**: Definitively fixed the package publishing structure by enforcing publishing from the `dist` directory.
  - Added `publish:dist` script to automate the correct workflow (`npm run build && cd dist && npm publish`).
  - Ensures consumers receive only compiled FESM bundles and types, resolving "Cannot find module" errors.

## [2.3.0] - 2026-02-08

### Added

- **SolidJS Support**: Introduced full support for SolidJS with a dedicated adapter package (`@shimmer-from-structure/solid`).
  - Native `<Shimmer>` component using SolidJS's fine-grained reactivity.
  - Context-based configuration using `ShimmerProvider`.
  - Full support for `templateProps` and reactive signals.
  - Parity with React, Vue, Svelte, and Angular adapters.
- **SolidJS Example App**: Added a high-fidelity dashboard demo showcasing independent loading states and reactive reflow in SolidJS (`examples/solid-example`).
- **CI/CD Integration**: Integrated SolidJS adapter into the automated build and test pipeline.

### Changed

- **Monorepo Versioning**: Synchronized all packages to version `2.3.0` for consistency.
- **CI Pipeline**: Re-enabled build and test steps in GitHub Actions for all frameworks.

## [2.2.3] - 2026-02-07

### Fixed

- **Angular: SSR Compatibility**: Fixed `ResizeObserver is not defined` error during Server-Side Rendering (SSR).
  - All browser-specific APIs (`ResizeObserver`, `MutationObserver`, `getBoundingClientRect`) are now properly guarded with `isPlatformBrowser`.
  - Effect execution is skipped on the server side.
  - Dependencies now correctly inject `PLATFORM_ID`.

## [2.2.2] - 2026-02-07

### Fixed

- **Angular: Module Resolution**: Fixed an issue where the package was published with incorrect structure, causing "Cannot find module" errors in consumer applications.
  - Now correctly publishes the compiled `dist` directory containing FESM bundles and type definitions.

## [2.2.1] - 2026-02-07

### Added

- **Angular: Extended Version Support**: Added support for Angular 19, 20, and 21.
  - Peer dependencies updated to allow broader range: `^19.0.0 || ^20.0.0 || ^21.0.0`.

## [2.2.0] - 2026-02-07

### Added

- **Angular Support**: Introduced full support for Angular with a dedicated adapter package (`@shimmer-from-structure/angular`)
  - Native `<shimmer>` component using Angular Signals
  - Dependency Injection based configuration (`provideShimmerConfig`)
  - Full support for `templateProps` and reactive inputs
  - Supports Standalone Components and Signals API
  - Parity with React, Vue, and Svelte adapters

### Changed

- **Standardization:** All framework adapters (React, Vue, Svelte) now use the shared `createResizeObserver` utility from `@shimmer-from-structure/core`.
- **React**: Removed unused refs and updated implementation to use core utility.
- **Vue**:
  - Aligned implementation with other adapters.
- **Svelte**:
  - Fixed animation scoping issue (keyframes now injected dynamically).

### Added

- **Core**: Added `createResizeObserver` utility
  - Centralized resize observation logic with `requestAnimationFrame` throttling.
  - Provides a consistent foundation for all framework adapters.

## [2.1.1] - 2026-02-04

### Fixed

- **Svelte: Runtime Duplication Fix**: Externalized Svelte subpaths in Vite configuration to prevent multiple Svelte runtime instances, resolve `effect_orphan` errors, and ensure Svelte 5 reactivity works correctly across package boundaries.

## [2.1.0] - 2026-02-02

### Added

- **React: Responsive Shimmer Layout**: Shimmer overlay now automatically adapts to layout changes during loading
  - Implemented `ResizeObserver` to detect container dimension changes
  - Uses `requestAnimationFrame` for smooth, real-time updates at 60fps
  - Automatically handles viewport resize, responsive breakpoints, and dynamic content reflow
  - Observer disconnects when loading completes (zero performance impact when not loading)
  - Fixes misalignment issues when layout changes occur during loading state

## [2.0.0] - 2026-01-29

### Breaking Changes

- **Svelte 5 Migration**: The Svelte adapter now requires Svelte 5
  - Dropped support for Svelte 4 (peer dependency changed from `^4.0.0 || ^5.0.0` to `^5.0.0`)
  - Component internals rewritten using Svelte 5 runes (`$props()`, `$state()`, `$derived()`, `$effect()`)
  - Slots replaced with `{@render children()}` snippet pattern
  - App mounting changed from `new App({...})` to `mount(App, {...})`

### Changed

- **Svelte Package**: Updated dependencies
  - `svelte`: `^5.0.0`
  - `svelte-check`: `^4.0.0`
  - `@sveltejs/vite-plugin-svelte`: `^4.0.0`
- **Documentation**: Updated all Svelte examples in README to use Svelte 5 syntax

### Fixed

- **Svelte Testing**: Added `resolve.conditions: ['browser']` to vite config for proper Svelte 5 test environment

## [1.1.0] - 2026-01-27

### Major Features Added

- **Svelte Support**: Introduced full support for Svelte with a dedicated adapter package (`@shimmer-from-structure/svelte`)
  - Native `<Shimmer>` component
  - Context helpers `setShimmerConfig` and `getShimmerConfig`
  - Full support for `templateProps` and reactivity
  - Parity with React and Vue adapters

### Added

- **Svelte Example App**: Added comprehensive Svelte example showcasing all features (`examples/svelte-example`)
- **Documentation**: Updated README with complete Svelte documentation, installation guide, and usage examples

### Changes

- **Version Bump**: All packages updated to `1.1.0`

## [1.0.0] - 2026-01-25

### Major Features Added

- **Vue 3 Support**: Introduced full support for Vue 3 with a dedicated adapter package (`@shimmer-from-structure/vue`)
  - Native `<Shimmer>` component
  - Composable `useShimmerConfig`
  - Global plugin registration `provideShimmerConfig`
  - Full support for `templateProps` and reactivity

- **Monorepo Architecture**: Restructured project into a scalable monorepo
  - `@shimmer-from-structure/core`: Framework-agnostic logic
  - `@shimmer-from-structure/react`: Dedicated React adapter
  - `@shimmer-from-structure/vue`: Dedicated Vue adapter
  - `shimmer-from-structure`: Main package for backward compatibility

### Changes

- **React Backward Compatibility**: The main package `shimmer-from-structure` now re-exports the React adapter, ensuring existing projects continue to work without changes.
- **Explicit Imports**: Recommended pattern is now to import from specific packages (e.g., `@shimmer-from-structure/react` or `@shimmer-from-structure/vue`).

### Improvements

- Added **Orders Table** example to Vue demo app
- Added **React Benchmark** suite to measure performance
- Improved documentation for both frameworks
- Standardized API across React and Vue adapters

### Migration

- **React Users**: No changes required (backward compatible).
- **Vue Users**: Install and import from `@shimmer-from-structure/vue`.
- See `MIGRATION.md` for details.

## [0.7.0] - 2026-01-24

### Improved

- **Automatic Table Handling**: The library now automatically detects text-only table cells (`td`, `th`) and measures the text width correctly, preventing merged shimmer blocks. You no longer need to wrap cell content in `<span>` tags manually!
- **Mixed Content**: improved support for mixed content (nodes with both text and elements), ensuring text nodes are properly shimmered.
- **Charts**: Improved shimmer support for charts by allowing them to render semi-transparently with template data.

## [0.6.0] - 2026-01-24

### Changed

- **Visible Borders**: Modified Shimmer to keep `border-color` visible while hiding text content. This ensures tables and cards maintain their structural outline during loading.

### Added

- **Dev Experience**: Configured Husky, lint-staged, and Prettier for better code quality.
- **Example**: Added a Table example to the demo app to showcase the improved border handling.

## [0.5.0] - 2026-01-24

### Added

- **Context API Support**: Introduced `ShimmerProvider` for setting global configuration values.
- **useShimmerConfig Hook**: Access shimmer configuration in any component.
- **New Exports**: Exported `ShimmerConfig` type and context components.

### Improved

- **Documentation**: Updated README with Context API usage examples.
- **Example App**: Added "Context API Example" section to the demo dashboard.

### Fixed

- **Testing**: Improved test resilience for border-radius fallbacks.
