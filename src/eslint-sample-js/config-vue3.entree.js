//@ts-check
import { defineFlatConfig } from "eslint-define-config";
import plugin_stylistic from "@stylistic/eslint-plugin";
import typescript_eslint from "typescript-eslint";
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
 * @template { Partial<import("eslint-define-config").Rules> } T
 * @param { T } rules
 */
function config_vue(rules) {
    const GLOB_VUE = "**/*.vue";
    const GLOB_SVG_VUE = "**/*.svg.vue";

    const flatConfig_vue = defineFlatConfig({
        files:   [GLOB_VUE],
        ignores: [GLOB_SVG_VUE],
        plugins: {
            /** @type { import("@stylistic/eslint-plugin/define-config-support") } */
            "@stylistic":         plugin_stylistic,
            /** @type { any } */
            "@typescript-eslint": typescript_eslint.plugin,
            vue:                  plugin_vue,
        },
        processor:       plugin_vue_processor,
        languageOptions: {
            parser:        parser_vue,
            parserOptions: {
                ecmaFeatures: {
                    jsx: false,
                },
                extraFileExtensions: [".vue"],
                /** @type { any } */
                parser:              typescript_eslint.parser,
                sourceType:          "module",
            },
        },
        rules,
    });

    return flatConfig_vue;
}

export {
    config_vue,
};

