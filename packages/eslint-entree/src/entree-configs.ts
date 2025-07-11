import type { Linter } from "eslint";
import { defineConfig } from "eslint/config";
import { config_typescript } from "./eslint-sample-js/config-typescript.entree.js";
import { config_vue } from "./eslint-sample-js/config-vue3.entree.js";
import { config_react } from "./eslint-sample-js/config-react.entree.js";
import { gitignore } from "./index.js";

/**
 * ESLint config for TypeScript + .gitignore file support from `eslint-config-flat-gitignore`.
 */
function typeScript(config: {
    gitignore:       boolean,
    typeScriptRules: Linter.RulesRecord,
}): Array<Linter.Config> {
    const { typeScriptRules, gitignore: _gitignore, } = config;

    return defineConfig([
        ...(_gitignore ? [gitignore()] : []),
        config_typescript(typeScriptRules),
    ]);
}

/**
 * ESLint config for TypeScript & Vue 3 + .gitignore file support from `eslint-config-flat-gitignore`.
 * 
 * Vue 3 support is focused on Single File Components with Composition API and `<script setup>`
 */
function vue3(config: {
    gitignore:       boolean,
    typeScriptRules: Linter.RulesRecord,
    vue3Rules:       Linter.RulesRecord,
}): Array<Linter.Config> {
    const { typeScriptRules, vue3Rules, gitignore: _gitignore, } = config;

    return defineConfig([
        ...(_gitignore ? [gitignore()] : []),
        config_typescript(typeScriptRules),
        config_vue({ ...typeScriptRules, ...vue3Rules, }),
    ]);
}

/**
 * ESLint config for TypeScript & React + .gitignore file support from `eslint-config-flat-gitignore`.
 */
function react(config: {
    gitignore:       boolean,
    typeScriptRules: Linter.RulesRecord,
    reactRules:      Linter.RulesRecord,
}): Array<Linter.Config> {
    const { typeScriptRules, reactRules, gitignore: _gitignore, } = config;

    return defineConfig([
        ...(_gitignore ? [gitignore()] : []),
        config_typescript(typeScriptRules),
        config_react({ ...typeScriptRules, ...reactRules, }),
    ]);
}

/**
 * Configs bundled with the library.
 */
export const entreeConfigs = {
    typeScript,
    vue3,
    react,
};
