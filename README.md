# ESLint entrée - an appetizer for linting 🥂

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Helping you incrementally adopt ESLint rules for TypeScript and Vue projects.

## Overview

ESLint is truly excellent for keeping codebases tidy, but I found adopting it to be wholly unappetizing:
- typing support was subpar, making setup confusing
- presets were bulky and wreaked havoc on existing codebases
- lots of config, reading documentation, and trivia knowledge needed just to run your first lint

What I wished for was:
- a quick way to see ESLint in action in an existing codebase
- tools to type-safely define rules I'm interested in
- tools to enable those rules incrementally, adapting the codebase rule-by-rule
- a working setup I could dig into to study, copy, and in-house it

This package is what I settled on.

And this readme is your one-stop-shop for getting your first ESLint-enabled project up-and-running for TypeScript!

## Guide

### Install
```bash
$ npm install @danwithabox/eslint-entree --save-dev
```

### First run
Create the ESLint [flat config](https://eslint.org/docs/latest/use/configure/configuration-files) file:
> `eslint.config.js`
```ts
// @ts-check
import { defineFlatConfig, entreeFilterRules, entreeConfigs, entreeRules } from "@danwithabox/eslint-entree";

const typeScriptRules = entreeFilterRules(entreeRules.typeScript(), {
    exclude: [],
});
const vue3Rules = entreeFilterRules(entreeRules.vue3(), {
    exclude: [],
});

export default defineFlatConfig([
    ...entreeConfigs.vue3({
        typeScriptRules,
        vue3Rules,
        gitignore: true, // Uses "eslint-config-flat-gitignore" under the hood to take .gitignore files into account
    }),
]);
```

> [!NOTE]
> Use `entreeConfigs.typeScript()` instead of `entreeConfigs.vue3()` without `vue3Rules` if you just want TypeScript support!

Now run `npx eslint` to see ESLint in action.

Next, we'll see how to highlight linting issues in VSCode, without running `npx eslint`.

### Configure VSCode
Install the [official ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), and that should be it!

The `eslint.config.js` file itself is checked too, remove an extra trailing comma somewhere to see if VSCode highlights the missing comma as a lint issue!

![image](https://github.com/user-attachments/assets/90e30055-46d3-48cb-a814-f337d47582e1)

If not:
- you may find that you have to run `ESLint: Restart ESLint Server`, or even `Developer: Reload Window` from the VSCode command palette to pick up config changes
- the extension's log can be seen in VSCode's Output tab (in the panel where the Terminal usually is), or in the bottom right of the status bar there may be a red "ESLint" button - check that if something still seems to be wrong

It's also recommended to enable lint-on-save, my project-level `.vscode/settings.json` file looks like this:
```json
{
    "eslint.useFlatConfig": true,
    "eslint.format.enable": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit",
        "source.organizeImports": "never",
    },

    "[javascript]": {
        "editor.defaultFormatter": "dbaeumer.vscode-eslint",
        "editor.formatOnSave": true,
    },
    "[typescript]": {
        "editor.defaultFormatter": "dbaeumer.vscode-eslint",
        "editor.formatOnSave": true,
    },
    "[vue]": {
        "editor.defaultFormatter": "dbaeumer.vscode-eslint",
        "editor.formatOnSave": true,
    },
}
```

You can use `File: Save without Formatting` from the VSCode command palette if you want to skip lint-on-save on occasion.

### Filtering

Let's say you're in an existing, messy codebase, and `npx eslint` spit out an overwhelming amount of issues.

An ergonomic and quick way to cut down on the noise, and see your codebase issues one rule at a time, is to adjust the filter.

The filter has two properties: `exclude`, and `include`. Both provide type-safe autocompletion of rules defined using `entreeDefineRules()`.

First apply `exclude` to ignore a very common issue, to "de-noise" the lint warnings:

```ts
// type-safe filtering of candidate rules
const typeScriptRules = entreeFilterRules(entreeRules.typeScript(), {
    exclude: [
        "@stylistic/comma-dangle",
    ],
});
```

Run `npx eslint`, and from the less noisy output, identify some rules you want to actually focus on fixing.

Provide those rules to `pick`:

```ts
// type-safe filtering of candidate rules
const typeScriptRules = entreeFilterRules(entreeRules.typeScript(), {
    exclude: [
        "@stylistic/comma-dangle",
    ],
    pick: [
        "@stylistic/eol-last",
        "@stylistic/no-extra-semi",
    ],
});
```

> [!NOTE]
> Passing an empty array to `pick` means "pick nothing", and so no rules will be applied.
> 
> You have to remove the `pick` prop to disable picking!

Run `npx eslint`, and see only those issues pop up.

Fix them manually, then repeat the process:
- run `npx eslint` to identify rules you want to adopt
- revise your filter's `exclude` and `pick` props
- fix issues identified by `npx eslint`
- repeat

### Beyond
To make copying and internalizing this repo's features for your own `eslint.config.js` file that much easier, I wrote all ESLint-related files in plain JS.

Head on over to [the `src/eslint-sample-js/` folder's readme](src/eslint-sample-js/readme.md) for more about internalizing code from this repo.

## Goals

### Use this package as a starting point for your own config

This package encourages you to familiarize yourself with ESLint through it, but not necessarily to keep it in your code forever. 

*Copy my homework, but change it up a little bit!*

I wrote this package with copying bits of it in mind. Especially the TypeScript and Vue configs, they are a good starting point to base your own config off of!

### Sane defaults, all of them skippable
The bundled rules and configs are completely subjective and of my own taste. I like stylistic fixes, and I like TypeScript and Vue, so I bundled these.

With [filtering](#filtering), you can easily cut down on the bundled rules.

I first wanted to extract them into their own packages, but the fracturing was more annoying than beneficial, and since this is a development-time package anyway, that shouldn't end up in production bundles. So I just left my subjective taste in as minor bloat.

I may add more configs in the future, if I start using additional stuff.

### Being a source of truth for the latest-and-greatest in ESLint
I aim to keep all contained plugins and configs up-to-date, handle deprecations, and to adopt improvements to ESLint as soon as possible.

### Keeping it vanilla
There are some fancy things, like [antfu's solution to support `.ts` configs](https://www.npmjs.com/package/eslint-ts-patch). It's very nice, but it's also incompatible with [the above goal](#use-this-package-as-a-starting-point-for-your-own-config) - I want people to be able to copy-paste from this source into their own ESLint config and have it work without further considerations.

This is why this repo is built upon `.js` files where ESLint is used, since [that's what the ESLint team officially supports](https://github.com/eslint/rfcs/pull/50#issuecomment-595916427).

Fortunately, JSDoc and `@ts-check` is enough to express and use TypeScript types in `.js` files too.

## Non-goals

### This library is **NOT** meant to "take over" ESLint configurations!

The provided configurations are meant to be a starting point, that you can plug-and-play, then peek under the hood and make your own configuration. See the relevant [goal](#use-this-package-as-a-starting-point-for-your-own-config).

Configs are way too complicated to abstract away, I instead provide working examples that you can use as a starting point!

Keeping `entreeDefineRules()` and `entreeFilterRules()` can be beneficial, as they are just minimal wrappers over the vanilla ESLint developer experience, they do not lock you in to this library.

### This library is **NOT** meant to solve ESLint ecosystem type safety!

The ESLint team is [adamant about only supporting  `.js` config files](https://github.com/eslint/rfcs/pull/50#issuecomment-595916427), and I respect that.

An unfortunate effect of that, however, is underdeveloped type-safety for ESLint plugins. Lots of rules have no type definitions for their options. I made an effort to enhance my utils with types where possible, but you will most likely be relying on documentations for options instead of the IDE, and that's normal.

### This library will **NOT** provide the [fancy sort of typescript-eslint rules](https://typescript-eslint.io/getting-started/typed-linting)

I have no idea why it's "recommended", it slows in-editor linting to a crawl, and I have never missed any of their supposed benefits.

### This library will NOT decide what the word "entrée" means
I realized too late that it means the "main course" instead of "appetizer" for some ~~insane~~ people, but hey, if you keep using this package then it's sorta the main course, right?

## Assurances
I use this package for my own projects so "dogfooding" and maintenance is guaranteed, and I have moved a large codebase to ESLint using this.

## ESLint ecosystem questions & answers
When I first tried ESLint, I soon faced many questions. Here's my light rant masquerading as helpful answers:

- what's "legacy config" and "flat config"?
    - `.eslintrc.js` is what you will find in old tutorials, the new standard is `eslint.config.js`
- where are all the damn type hints and TS support?
    - they basically don't exist, good luck
- why is TSLint deprecated?
    - Good Reasons™, if you see a tutorial mention it, look for a new one
- what's the fuss with "stylistic rules"?
    - read this: https://eslint.style/guide/why
    - if you consider using [Prettier](https://prettier.io/) for stylistic fixes, I personally don't recommend it, I prefer granular control over code style, hence making this package
- what the hell are "type-aware" TS rules?
    - mostly, they are just [slow and annoying](https://typescript-eslint.io/getting-started/typed-linting/#how-is-performance), but if you want to try them, feel free to do so
    - even though `typescript-eslint` recommends them, I never once missed them and this package will not support them out-of-the-box
- which rules are broken?
    - more than I expected, especially [`typescript-eslint`'s `indent`](https://eslint.style/rules/ts/indent), it's [absolutely knackered](https://github.com/typescript-eslint/typescript-eslint/issues/1824), and as such I didn't even enable it
- are all the plugin presets really that massive and opinionated?
    - yes, and I don't know why, I found them all extremely annoying, and they are half the reason for making this package
- am I really supposed to read through hundreds of rules to pick the ones I want?
    - yep, and some of them might be even conflicting!
    - and this is why I provide [sane defaults](#sane-defaults-all-of-them-skippable)

## Acknowledgements
The goals of the package are inspired by [antfu's config](https://github.com/antfu/eslint-config), digging into it helped me get up to speed with ESLint much faster.

## Feedback & Contribution
Feel free to voice concerns about ease-of-use, or if you found something confusing in the ESLint ecosystem that should be covered here. This repo is meant to be a help in getting up to speed with ESLint!
