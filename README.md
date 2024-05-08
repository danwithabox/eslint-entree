# ESLint entrée - make ESLint config authoring appetizing

# ESLint entrée - for TypeScript

An appetizer for linting.

Focusing on incremental, non-jarring adoption of rules for TypeScript.

Uses `@danwithabox/eslint-entree`.

Or if you consider an "entrée" to be the main course, cherrypick what you like from the **filterable** [tiny bundled config](#bundled-config).

### Goal:
To make the adoption of ESLint appetizing.

Why is it unappetizing by default?
- adopting ESLint is hindered by its learning curve
- to ease that, "config presets" are provided
- which are massive, causing unease:
    - for new projects, you're unsure what rules you commit to
    - for mature projects, thousands of linting errors pop up, you're jarred
- your choices are:
    - meticulously overriding the preset
    - building yours from scratch
- neither is very fun, and is full of [pitfalls](#learning-curve-savings)!

How does this package help?
- the plugins are preconfigured without rules, no need to research its setup
- you define rules **with typed keys** via `flatConfigDefineRules` (even in vanilla JS)
- the **typed keys** enable comfy filtering via `flatConfigFilterRules`
- now you can easily `"pick"` or `"exclude"` the rules you want as you adopt them, instead of messing with the config itself

First, you probably just want reassurance that it works - pick one rule from the [tiny bundled config](#bundled-config), see how your codebase likes it, and go from there. Pick more, or copy some from elsewhere!

And if you ever want to completely in-house the plugins too, simply peek into this library and copy what you need.

### Commitment:
Keeping this up-to-date, as I want to use this for my own project.

### Bundled config:
The bundled config mostly provides stylistic lints that are easy to check whether they work or not.

### Filtering:
Grab a set of rules, feed it into `flatConfigFilterRules`, pick one, check what lints it catches!

> GIF

Or exclude stuff you are unsure about for now!

> GIF

### Learning curve savings:
When I first tried ESLint, I soon found myself in good ol' **_JS ecosystem quicksand_**, sinking in a pile of questions:

- what is flat config, can I use it yet (yes)
- where are all the damn type hints and TS support (basically doesn't exist)
- why is TSLint deprecated (good reasons)
- why are stylistic rules replacing TSLint rules (great reasons)
- how does it work in VSCode (see TODO: VSCODE CONFIG)
- what the hell are "type-aware" TS rules (mostly, just slow)
- which rules are broken (more than I expected, especially indent)
- does the config even work, where do I check the logs (good luck non-VSCode users)
- why are all the presets massive (everyone is very opinionated)
- how do I know which rules do what (docs, see TODO: LINK TO DOCS)

So after I researched all that, I started building my own config, and made tools to make authoring it easier for the mature codebase I was trying to use it in.

### Other notes:
Inspired by antfu's config that helped me a lot by inspecting how it worked, but which I found a bit too much for a minimal test.

Written in JS instead of TS because:
- the ESLint team isn't interested in adopting TS, unfortunately (https://github.com/eslint/rfcs/pull/50#issuecomment-595916427)
- so keeping the source in JS makes it easier to peek into the package and borrow ideas for your own setup

Fortunately, JSDoc and `@ts-check` is enough to express and use TS types.

# ESLint entrée - for Vue 3

An appetizer for linting.

Focusing on incremental, non-jarring adoption of rules for Vue 3.

Uses `@danwithabox/eslint-entree` and `@danwithabox/eslint-entree-typescript`.

Or if you consider an "entrée" to be the main course, cherrypick what you like from the **filterable** [tiny bundled config](#bundled-config).

### Goal:
To make the adoption of ESLint appetizing.

Why is it unappetizing by default?
- adopting ESLint is hindered by its learning curve
- to ease that, "config presets" are provided
- which are massive, causing unease:
    - for new projects, you're unsure what rules you commit to
    - for mature projects, thousands of linting errors pop up, you're jarred
- your choices are:
    - meticulously overriding the preset
    - building yours from scratch
- neither is very fun, and is full of [pitfalls](#learning-curve-savings)!

How does this package help?
- the plugins are preconfigured without rules, no need to research its setup
- you define rules **with typed keys** via `flatConfigDefineRules` (even in vanilla JS)
- the **typed keys** enable comfy filtering via `flatConfigFilterRules`
- now you can easily `"pick"` or `"exclude"` the rules you want as you adopt them, instead of messing with the config itself

TODO: explain what the plugin does - lints vue SFC, TS inside it, adopts TS rules for vue template expressions too

First, you probably just want reassurance that it works - pick one rule from the [tiny bundled config](#bundled-config), see how your codebase likes it, and go from there. Pick more, or copy some from elsewhere!

And if you ever want to completely in-house the plugins too, simply peek into this library and copy what you need.

### Commitment:
Keeping this up-to-date, as I want to use this for my own project.

### Bundled config:
The bundled config only cares about the state-of-the-art variation of Vue 3 consisting of:
- [TypeScript](https://vuejs.org/guide/typescript/overview#usage-in-single-file-components)
- [Compostion API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [`<script setup>`](https://vuejs.org/api/sfc-script-setup.html)

### Filtering:
Grab a set of rules, feed it into `flatConfigFilterRules`, pick one, check what lints it catches!

> GIF

Or exclude stuff you are unsure about for now!

> GIF

### Learning curve savings:
When I first tried ESLint, I soon found myself in good ol' **_JS ecosystem quicksand_**, sinking in a pile of questions:

- what is flat config, can I use it yet (yes)
- where are all the damn type hints and TS support (basically doesn't exist)
- why is TSLint deprecated (good reasons)
- why are stylistic rules replacing TSLint rules (great reasons)
- how does it work in VSCode (see TODO: VSCODE CONFIG)
- what the hell are "type-aware" TS rules (mostly, just slow)
- which rules are broken (more than I expected, especially indent)
- does the config even work, where do I check the logs (good luck non-VSCode users)
- why are all the presets massive (everyone is very opinionated)
- how do I know which rules do what (docs, see TODO: LINK TO DOCS)

So after I researched all that, I started building my own config, and made tools to make authoring it easier for the mature codebase I was trying to use it in.

### Other notes:
Inspired by antfu's config that helped me a lot by inspecting how it worked, but which I found a bit too much for a minimal test.

Written in JS instead of TS because:
- the ESLint team isn't interested in adopting TS, unfortunately (https://github.com/eslint/rfcs/pull/50#issuecomment-595916427)
- so keeping the source in JS makes it easier to peek into the package and borrow ideas for your own setup

Fortunately, JSDoc and `@ts-check` is enough to express and use TS types.