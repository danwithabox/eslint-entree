//@ts-check
import { defineFlatConfig } from "eslint-define-config";
import { config_typescript, rules_config_typescript } from "./config-typescript.eslint.js";
import { config_vue, rules_config_vue } from "./config-vue.eslint.js";
import { gitignore } from "./index.js";

export * from "./config-typescript.eslint.js";
export * from "./config-vue.eslint.js";

/**
 * @param {Partial<{ typescript: Partial<import("eslint-define-config").Rules>, gitignore: boolean, }>=} rules 
 * @returns {Array<import("eslint-define-config").FlatESLintConfig>}
 */
export function entreeConfigTypeScript(rules) {
    const _rules_config_typescript = rules?.typescript ?? rules_config_typescript();
    const _rules_config_gitignore = rules?.gitignore ?? true;

    return defineFlatConfig([
        ...(_rules_config_gitignore ? [gitignore()] : []),
        config_typescript(_rules_config_typescript),
    ]);
}

/**
 * @param {Partial<{
 *      typescript: Partial<import("eslint-define-config").Rules>,
 *      vue: Partial<import("eslint-define-config").Rules>,
 *      gitignore: boolean,
 * }>=} rules 
 * @returns {Array<import("eslint-define-config").FlatESLintConfig>}
 */
export function entreeConfigVue3SOTA(rules) {
    const _rules_config_typescript = rules?.typescript ?? rules_config_typescript();
    const _rules_config_vue = rules?.vue ?? rules_config_vue();
    const _rules_config_gitignore = rules?.gitignore ?? true;

    return defineFlatConfig([
        ...(_rules_config_gitignore ? [gitignore()] : []),
        config_typescript(_rules_config_typescript),
        config_vue({ ..._rules_config_typescript, ..._rules_config_vue, }),
    ]);
}
