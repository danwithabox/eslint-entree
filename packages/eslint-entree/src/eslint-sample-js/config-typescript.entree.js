//@ts-check
import { defineConfig } from "eslint/config";
import plugin_stylistic from "@stylistic/eslint-plugin";
import tseslint from "typescript-eslint";

/**
 * Provides the needed plugin and parser config for TypeScript.
 * 
 * @template { import("eslint").Linter.RulesRecord } T
 * @param { T } rules
 */
function config_typescript(rules) {
    const GLOB_SRC = ["**/*.?([cm])[jt]s"];

    const flatConfig_typescript = defineConfig({
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
        },
        languageOptions: {
            /**
             * Typing irreconcilable due to:
             * - https://github.com/un-ts/eslint-plugin-import-x/issues/203
             * - https://github.com/typescript-eslint/typescript-eslint/issues/10935
             * - https://github.com/typescript-eslint/typescript-eslint/issues/10899
             * @type { any }
             */
            parser:        tseslint.parser,
            parserOptions: {
                sourceType: "module",
            },
        },
        rules,
    });

    return flatConfig_typescript;
}

export {
    config_typescript,
};
