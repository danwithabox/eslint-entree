# Internalizing the library's code

If you decided to internalize your own ESLint config, this folder contains the samples that are used by the library.

## Overview
The files in this folder contain helpful bits of knowledge that you otherwise would have to gather from various places on the internet, such as:
- using `// @ts-check`
- JSDoc type syntax
- assurance that yes, some imports and values have no type definitions, and it's correct to mark them with `// @ts-expect-error`
- using the rarely-mentioned [`eslint-define-config`](https://github.com/eslint-types/eslint-define-config) package
- injecting rule definition types with triple-slash references, like `/// <reference types="@stylistic/eslint-plugin/define-config-support" />`
- enabling TypeScript support in Vue 3 templates
- adapting TypeScript rule options to equivalent Vue 3 template expression rules with `entreeAdoptOptionsFromRules()`

## Browsing the code

I recommend using the [GitHub Repositories](https://marketplace.visualstudio.com/items?itemName=GitHub.remotehub) VSCode extension to browse these files without having to clone the repo.
