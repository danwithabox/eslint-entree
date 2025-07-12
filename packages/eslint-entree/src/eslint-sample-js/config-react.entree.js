//@ts-check
import { defineConfig } from "eslint/config";
import globals from "globals";
import plugin_stylistic from "@stylistic/eslint-plugin";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

/**
 * Provides the needed plugin and parser config for React.
 * 
 * @template { import("eslint").Linter.RulesRecord } T
 * @param { T } rules
 */
function config_react(rules) {
    const GLOB_SRC = ["**/*.[jt]sx"];

    const flatConfig_react = defineConfig({
        files:   [...GLOB_SRC],
        plugins: {
            /** @type { import("@stylistic/eslint-plugin/define-config-support") } */
            "@stylistic":         plugin_stylistic,
            /**
             * Typing irreconcilable due to:
             * - https://github.com/un-ts/eslint-plugin-import-x/issues/203
             * - https://github.com/typescript-eslint/typescript-eslint/issues/10935
             * - https://github.com/typescript-eslint/typescript-eslint/issues/10899
             * @type { any }
             */
            "@typescript-eslint": tseslint.plugin,
            "react-hooks":        /** @type {any} */ (reactHooks),
            "react-refresh":      reactRefresh,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            /**
             * Typing irreconcilable due to:
             * - https://github.com/un-ts/eslint-plugin-import-x/issues/203
             * - https://github.com/typescript-eslint/typescript-eslint/issues/10935
             * - https://github.com/typescript-eslint/typescript-eslint/issues/10899
             * @type { any }
             */
            parser:        tseslint.parser,
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
