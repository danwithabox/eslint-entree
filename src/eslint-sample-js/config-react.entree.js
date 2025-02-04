//@ts-check
/// <reference types="@stylistic/eslint-plugin/define-config-support" />
import { defineFlatConfig } from "eslint-define-config";
import globals from "globals";
import plugin_stylistic from "@stylistic/eslint-plugin";
import typescript_eslint from "typescript-eslint";
// @ts-expect-error: No type definition
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

/**
 * Provides the needed plugin and parser config for React.
 * 
 * @template { Partial<import("eslint-define-config").Rules> } T
 * @param { T } rules
 */
function config_react(rules) {
    const GLOB_SRC = "**/*.[jt]sx";

    const flatConfig_react = defineFlatConfig({
        files:   [GLOB_SRC],
        plugins: {
            /** @type { import("@stylistic/eslint-plugin/define-config-support") } */
            "@stylistic":         plugin_stylistic,
            /** @type { any } */
            "@typescript-eslint": typescript_eslint.plugin,
            "react-hooks":        /** @type {any} */ (reactHooks),
            "react-refresh":      reactRefresh,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parser:        typescript_eslint.parser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                extraFileExtensions: [".tsx"],
                /** @type { any } */
                sourceType:          "module",
            },
        },
        rules,
    });

    return flatConfig_react;
}

export {
    config_react,
};
