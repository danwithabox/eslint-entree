import { defineFlatConfig, type Rules, type FlatESLintConfig } from "eslint-define-config";
import { config_typescript } from "./eslint-sample-js/config-typescript.entree.js";
import { config_vue } from "./eslint-sample-js/config-vue3.entree.js";
import { config_react } from "./eslint-sample-js/config-react.entree.js";
import { gitignore } from "./index.js";

/**
 * ESLint config for TypeScript + .gitignore file support from `eslint-config-flat-gitignore`.
 */
function typeScript(config: {
    gitignore:       boolean,
    typeScriptRules: Partial<Rules>,
}): Array<FlatESLintConfig> {
    const { typeScriptRules, gitignore: _gitignore, } = config;

    return defineFlatConfig([
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
    typeScriptRules: Partial<Rules>,
    vue3Rules:       Partial<Rules>,
}): Array<FlatESLintConfig> {
    const { typeScriptRules, vue3Rules, gitignore: _gitignore, } = config;

    return defineFlatConfig([
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
    typeScriptRules: Partial<Rules>,
    reactRules:      Partial<Rules>,
}): Array<FlatESLintConfig> {
    const { typeScriptRules, reactRules, gitignore: _gitignore, } = config;

    return defineFlatConfig([
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
