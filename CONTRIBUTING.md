# Contributing to Shimmer From Structure

Thank you for considering contributing to this repo. Glad you believe we should'nt manually maintain loading skeletons.

## Introduction

Shimmer From Structure is a monorepo containing a core logic package and adapters for various frameworks (React, Vue, Svelte, Angular, SolidJS). We welcome contributions of all kinds, from bug fixes and documentation improvements to new features and framework adapters.

## Getting Started

### Prerequisites

- **Node.js**: We recommend using the latest LTS version.
- **npm**: This project uses npm workspaces.

### Installation

1.  **Fork the repository** on GitHub.
2.  **Clone your fork** locally:
    ```bash
    git clone https://github.com/darula-hpp/shimmer-from-structure.git
    cd shimmer-from-structure
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```

## Project Structure

This project is a monorepo managed with npm workspaces:

- `packages/core`: The framework-agnostic logic for DOM measurement and shimmer generation.
- `packages/react`: The React adapter.
- `packages/vue`: The Vue 3 adapter.
- `packages/svelte`: The Svelte adapter.
- `packages/angular`: The Angular adapter.
- `packages/solid`: The SolidJS adapter.
- `packages/shimmer-from-structure`: The main package (re-exports React for backward compatibility).
- `examples/`: Example applications for each framework to test your changes.

## 🛠️ Development Workflow

### Building Packages

You can build all packages at once or individual ones:

```bash
# Build all packages
npm run build

# Build specific packages
npm run build:core
npm run build:react
npm run build:vue
npm run build:svelte
npm run build:angular
npm run build:solid
npm run build:main
```

### Running Examples

To test your changes, you can run the example projects. Check the `README.md` in each example folder for specific instructions, or look at the root `package.json` scripts.

## Testing

We use Vitest for testing. Please ensure all tests pass before submitting a PR.

```bash
# Run all tests
npm test
```

If you're adding a new feature, please include relevant tests.

## Code Quality

### Linting & Formatting

We use ESLint and Prettier to maintain code quality and consistency.

```bash
# Lint code
npm run lint

# Format code
npm run format
```

This project uses Husky for pre-commit hooks to ensure code quality before committing.

## Submitting Changes

1.  **Create a new branch** for your feature or fix:
    ```bash
    git checkout -b feature/amazing-feature
    ```
2.  **Make your changes**.
3.  **Commit your changes** with a descriptive commit message. We follow [Conventional Commits](https://www.conventionalcommits.org/):
    - `feat: add support for X`
    - `fix: resolve issue with Y`
    - `docs: update README`
4.  **Push to your fork**:
    ```bash
    git push origin feature/amazing-feature
    ```
5.  **Open a Pull Request** against the `dev` branch of the original repository.

### Pull Request Guidelines

- Provide a clear description of what the PR does.
- Link to any related issues.
- Ensure all tests pass.
- Update documentation if necessary.

Thank you for your contribution!
