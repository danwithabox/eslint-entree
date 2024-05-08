TODO:
- [ ] vitest all utils
    - [ ] test code coverage capability of vitest
- [ ] nonsense: flatConfigFilterRules without second parameter causes empty object return type

--- typescript
TODO
- [ ] USAGE in docs
- [ ] gitignore thing
- [ ] `languageOptions` should be exposed, with the default being importable so that devs can know the defaults of nested options too
    - [ ] and can change `sourceType`

--- vue 3

@danwithabox/eslint-entree
    provides tooling to prototype your own configs and rules in a TS environment, especially for an existing codebase, where you don't want a sudden glut of linting errors and would rather introduce fitting rules one-by-one
@danwithabox/eslint-entree-typescript
    uses eslint-entree to provide a starter for your own TS linting
@danwithabox/eslint-entree-vue3
    Uses eslint-entree and adopts eslint-entree-typescript to provide a starter for your own Vue 3 linting

It helps with:
- matching rules where one extends another, allowing the definition of options in one place
    - TODO: does that actually work properly? does it override options or can you extend them?

TODO:
- [ ] Nuxt compatibility
    - [ ] example
        - `.nuxt` folder excluded
        - excluded `vue/no-undef-components`
        - `.nuxtignore` should contain `"eslint.config.js"`
        - mention that reactive usage rules (like `vue/require-typed-ref`) won't be caught until upstream is resolved https://github.com/vuejs/eslint-plugin-vue/issues/2166
- [ ] `languageOptions` should be exposed, with the default being importable so that devs can know the defaults of nested options too
    - [ ] and can change `sourceType`
        - sourceType
            - check how antfu does it?
- dependabot
- example GIF by showing eslint.config.js excluding comma dangle, and hovering missing comma dangle
    - explain that using pick can help you gradually adopt ESLint in an existing codebase
        - okay but then it should be a dual CJS/ESM package, or at least the helpers should be
- update packages
- try https://www.npmjs.com/package/eslint-flat-config-viewer
    - and if it's neat, recommend it in docs
- VSCode guide similar to https://www.npmjs.com/package/eslint-preset-vue
- document which rules you can make configs from
- filtering as a parameter
    - want to allow extra rules too with `defineFlatConfigRules`, so how does that work
        - provide the utils to construct your own rules, or provide options for the lean function
    - document recommendation: https://www.npmjs.com/package/eslint-config-flat-gitignore
- document that instead of configuring my package, you should copy it
- document the ignore of `.svg.vue` files
- document that it works for js files too
- document choices
    - indentation, because it is broken as hell https://eslint.style/rules/ts/indent, it conflicted with things
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
- github actions, dependabot

- nuxt docs tips:
    ```
    Why use this module?
    How to use this module?
    What does this module do?
    ```
    - Linking to the integration website and documentation is always a good idea.
    - npm badge
    - [Provide a StackBlitz Demo or Boilerplate](https://nuxt.com/docs/guide/going-further/modules#provide-a-stackblitz-demo-or-boilerplate)

RESEARCH:
- reactive rules in .ts files, like https://github.com/vuejs/eslint-plugin-vue/blob/master/lib/rules/no-side-effects-in-computed-properties.js
