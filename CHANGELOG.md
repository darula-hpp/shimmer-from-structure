# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
