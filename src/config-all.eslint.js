//@ts-check
import { defineFlatConfig } from "eslint-define-config";
import { config_typescript } from "./config-typescript.eslint.js";
import { config_vue } from "./config-vue.eslint.js";
import { gitignore } from "./index.js";

export * from "./config-typescript.eslint.js";
export * from "./config-vue.eslint.js";

/**
 * @param {{ typescriptRules: Partial<import("eslint-define-config").Rules>, gitignore: boolean, }} config 
 * @returns {Array<import("eslint-define-config").FlatESLintConfig>}
 */
function entreeConfig_typeScriptExample(config) {
    const { typescriptRules, gitignore: _gitignore, } = config;

    return defineFlatConfig([
        ...(_gitignore ? [gitignore()] : []),
        config_typescript(typescriptRules),
    ]);
}

/**
 * @param {{
 *      typescriptRules: Partial<import("eslint-define-config").Rules>,
 *      vue3Rules: Partial<import("eslint-define-config").Rules>,
 *      gitignore: boolean,
 * }} config 
 * @returns {Array<import("eslint-define-config").FlatESLintConfig>}
 */
function entreeConfig_vue3Example(config) {
    const { typescriptRules, vue3Rules, gitignore: _gitignore, } = config;

    return defineFlatConfig([
        ...(_gitignore ? [gitignore()] : []),
        config_typescript(typescriptRules),
        config_vue({ ...typescriptRules, ...vue3Rules, }),
    ]);
}


export const entreeConfigs = {
    typeScriptExample: entreeConfig_typeScriptExample,
    vue3Example:       entreeConfig_vue3Example,
};
