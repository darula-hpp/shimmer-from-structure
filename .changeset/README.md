# Changesets Workflow

This project uses [Changesets](https://github.com/changesets/changesets) for version management and publishing.

## How It Works

1. **Make changes** to any package
2. **Create a changeset** describing your changes
3. **Merge to main** - Changesets bot creates a "Version Packages" PR
4. **Merge the Version PR** - Packages are automatically published to npm

## Creating a Changeset

After making changes, run:

```bash
npm run changeset
```

This will prompt you to:

- Select which packages changed (use space to select, enter to confirm)
- Choose the version bump type (major, minor, patch)
- Write a summary of the changes

The changeset is saved as a markdown file in `.changeset/` and should be committed with your changes.

## Version Bump Guidelines

- **Major** (breaking changes): API changes that require user code updates
- **Minor** (new features): New functionality that's backward compatible
- **Patch** (bug fixes): Bug fixes and small improvements

## Linked Packages

All packages in this monorepo are linked together - they always release with the same version number. This is configured in `.changeset/config.json`.

## Publishing Flow

1. Push changes with changeset to `dev` branch
2. Create PR to `main`
3. Merge PR to `main`
4. Changesets bot automatically creates a "Version Packages" PR that:
   - Bumps versions in all affected packages
   - Updates CHANGELOG.md files
   - Updates internal dependencies
5. Review and merge the "Version Packages" PR
6. Packages are automatically published to npm via GitHub Actions

## Manual Commands

```bash
# Create a changeset
npm run changeset

# Version packages (done automatically by bot)
npm run version

# Publish packages (done automatically by CI)
npm run release
```

## Special Cases

### Angular Package

The Angular adapter publishes from its `dist/` folder. The Changesets workflow handles this automatically with a post-publish step.

### Emergency Manual Release

If the automated workflow fails, you can trigger the backup manual release workflow by creating a GitHub Release.
