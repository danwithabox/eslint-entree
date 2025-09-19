//@ts-check
import { defineConfig } from "eslint/config";
import plugin_stylistic from "@stylistic/eslint-plugin";
import tseslint from "typescript-eslint";
import plugin_vue from "eslint-plugin-vue";
// @ts-expect-error: No type definition
import plugin_vue_processor from "eslint-plugin-vue/lib/processor.js";
import parser_vue from "vue-eslint-parser";

/**
 * Provides the needed plugin and parser config for Vue 3 with:
 * - TypeScript support in `<script>` blocks and template expressions
 * - Single File Components
 * - Composition API
 * - and `<script setup>`
 * 
 * https://eslint.vuejs.org/
 * 
 * @template { import("eslint").Linter.RulesRecord } T
 * @param { T } rules
 */
function config_vue(rules) {
    const GLOB_VUE = ["*.vue", "**/*.vue"];
    const GLOB_SVG_VUE = ["**/*.svg.vue"];

    const flatConfig_vue = defineConfig({
        files:   [...GLOB_VUE],
        ignores: [...GLOB_SVG_VUE],
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
            /**
             * Typing irreconcilable
             * @type { any }
             */
            vue:                  plugin_vue,
        },
        languageOptions: {
            parser:        parser_vue,
            sourceType:    "module",
            parserOptions: {
                parser:       tseslint.parser,
                sourceType:   "module",
                ecmaFeatures: {
                    jsx: false,
                },
                extraFileExtensions: [".vue"],
            },
        },
        processor: plugin_vue_processor,
        rules,
    });

    return flatConfig_vue;
}

export {
    config_vue,
};

