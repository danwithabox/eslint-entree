# lean-vue3-eslint-config

## TODO: rename package to something that implies prototyping and learning better. Starter? Appetizer? Simple?

Lean and minimal ESLint config for the very specific bleeding edge variation of Vue 3 consisting of:
- [TypeScript](https://vuejs.org/guide/typescript/overview#usage-in-single-file-components)
- [Compostion API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [`<script setup>`](https://vuejs.org/api/sfc-script-setup.html)

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c). I _may_ accept PRs to make it CommonJS compatible if it's a minimal change, but I myself want to be free of having to think about CJS stuff, sorry 🤷‍♂️

When I was aiming to put together a quick config that catches a few extra stuff beyond what TS and Volar handles, like missing component definitions, I found myself in JS ecosystem hell:

- what is flat config
- where are all the damn type hints
- why is TSLint deprecated
- why is stylistic rules under the replacement to TSLint is deprecated
- how does TS linting work in Vue files and templates
- how does it work in VSCode
- what the hell are "type-aware" TS rules
- why are some rules broken
- why are all the presets overbearing
- can I really not author these in TS and if so how can I have at least some type checking

This package is meant to be a minimalistic config, and a guideline to making your own, with as few dependencies as possible, using the latest and greatest stuff like @stylistic and ESLint "flat config".

It uses utils (TODO: link) I made to make prototyping and "shopping" for specific rules easier.

It helps with:
- picking new rules to try them in isolation
- excluding rules to narrow the config for conflict debugging purposes, without having to comment out rulesets
- defining rules in a type-hint friendly way, to allow for picking and excluding
- matching rules where one extends another, allowing the definition of options in one place
    - TODO: does that actually work properly? does it override options or can you extend them?

Inspired by antfu's config that helped me a lot by inspecting how it worked, but which I found a bit too much for a minimal test.

Written in JS instead of TS because:
- the ESLint team isn't interested in adopting TS, unfortunately (https://github.com/eslint/rfcs/pull/50#issuecomment-595916427)
- so keeping the source in JS makes it easier to peek into the package and borrow ideas for your own setup

Fortunately, JSDoc and `@ts-check` is enough to express and use TS types for some improved ergonomics:
- `defineFlatConfigRules`


TODO:
- example GIF by showing eslint.config.js excluding comma dangle, and hovering missing comma dangle
    - explain that using pick can help you gradually adopt ESLint in an existing codebase
        - okay but then it should be a dual CJS/ESM package, or at least the helpers should be
- update packages
- package flat-config-utils
- try https://www.npmjs.com/package/eslint-flat-config-viewer
- VSCode guide similar to https://www.npmjs.com/package/eslint-preset-vue
- document which rules you can make configs from
- filtering as a parameter
    - want to allow extra rules too with `defineFlatConfigRules`, so how does that work
        - provide the utils to construct your own rules, or provide options for the lean function
    - document recommendation: https://www.npmjs.com/package/eslint-config-flat-gitignore
- document that it only works for "module"
- document that instead of configuring my package, you should copy it
- document the ignore of `.svg.vue` files
- document that it works for js files too
- document choices
    - ignored all type-aware rules
    - ignored JSX (but is enabled in vue parser `ecmaFeatures` to not cause issues)
- document example of why you need ESLint and why is it better to roll your own by linking to talk [Make the Right Thing the Easy Thing: Designing Processes Teams Will Actually Follow](https://www.youtube.com/watch?v=xqT8e6_yzLg)
- example extension of rules with `no-restricted-imports`:
    ```js
    "no-restricted-imports":                    ["off"],
    "@typescript-eslint/no-restricted-imports": ["error", {
        // TODO: expose this config somehow
        // patterns: [{
        //     group:   ["@some/import/path*"],
        //     message: `Some import issue message`,
        // }],
    }],
    ```
- example override by removing spacing
- utils as a package?
- github actions, dependabot