# @danwithabox/eslint-entree

## 0.7.2

### Patch Changes

- cbd9e47: fix: moved eslint from peerDependencies to dependencies to have more control over package integrity
- cbd9e47: chore: updated deps to fix config errors with eslint@9.35.0

## 0.7.1

### Patch Changes

- 752b820: 💥 Breaking:
  - the previous version, `0.7.0`, removed the `defineFlatConfig` export in favor of `export { defineConfig } from "eslint/config"`, update code accordingly
- 752b820: docs: updated references of `defineFlatConfig` to `defineConfig`

## 0.7.0

### Minor Changes

- 31f8158: feat: better typing, enabling the user to pick indentation settings based on the docs and the code example

### Patch Changes

- 046085f: build: moved to `pnpm`, Volta, and `tsdown`
- 31f8158: build: transformed into a monorepo, to help consuming the ESLint config locally, and eventually to test it more easily
- 31f8158: docs: updated mentions of indentation - it's now apparently usable, woo!
- d1f53c6: ci: fixing CI checks on the release PR
- b8ccbaf: ci: improved GitHub Actions
- a91743c: build: removed commitlint
- 31f8158: chore: updated eslint related dependencies, untangled some deprecations, official types used in more places
- 31f8158: test: updated example messiness files in `packages/testing-eslint-entree`
