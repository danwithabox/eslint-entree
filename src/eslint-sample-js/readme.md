# Samples to copy

If you decided to fully own your own ESLint config, here are the samples that are used by the library.

These are a helpful guide, showing stuff you otherwise would have to gather from various places on the internet, such as:
- using `// @ts-check`
- JSDoc type syntax
- assurances that yes, some imports and values have no type definitions, and it's correct to mark them with `// @ts-expect-error`
- using the rarely-mentioned [`eslint-define-config`](https://github.com/eslint-types/eslint-define-config) package
- injecting rule definition types with triple-slash references, like `/// <reference types="@stylistic/eslint-plugin/define-config-support" />`
- enabling TypeScript support in Vue 3 templates
- adapting TypeScript rule options to equivalent Vue 3 template expression rules with `entreeAdoptOptionsFromRules()`