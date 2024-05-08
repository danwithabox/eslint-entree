//@ts-check
import { defineFlatConfig } from "eslint-define-config";
import { flatConfigAdoptOptionsFromRules, flatConfigDefineRules } from "./utils.eslint";
import { rules_config_typescript_stylistic } from "./config-typescript.eslint";
import plugin_stylistic from "@stylistic/eslint-plugin";
import tseslint from "typescript-eslint";
// @ts-expect-error: No type definition
import plugin_vue from "eslint-plugin-vue";
// @ts-expect-error: No type definition
import plugin_vue_processor from "eslint-plugin-vue/lib/processor.js";
import parser_vue from "vue-eslint-parser";

/**
 * Provides the needed plugin and parser config.
 * 
 * @template { Partial<import("eslint-define-config").Rules> } T
 * @param { T } rules
 */
export function config_vue(rules) {
    const GLOB_VUE = "**/*.vue";
    const GLOB_SVG_VUE = "**/*.svg.vue";
    const flatConfig_vue = defineFlatConfig({
        files:   [GLOB_VUE],
        ignores: [GLOB_SVG_VUE],
        plugins: {
            /** @type { import("@stylistic/eslint-plugin/define-config-support") } */
            "@stylistic":         plugin_stylistic,
            /** @type { any } */
            "@typescript-eslint": tseslint.plugin,
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
                parser:              tseslint.parser,
                sourceType:          "module",
            },
        },
        rules,
    });
    return flatConfig_vue;
}

/** All rules checked as of eslint-plugin-vue@9.19.2 */
export function rules_config_vue() {
    const rules = flatConfigDefineRules({
        ...rules_config_vue_base(),
        ...rules_config_vue_essential(),
        ...rules_config_vue_strongly_recommended(),
        ...rules_config_vue_recommended(),
        ...rules_config_vue_uncategorized(),
        ...rules_config_vue_extension_rules_forTemplateExpressions(),
    });

    return rules;
}

/**
 * All rules checked as of eslint-plugin-vue@9.19.2
 */
export function rules_config_vue_base() {
    return flatConfigDefineRules({
        "vue/comment-directive": ["error"],
    });
}

/**
 * All rules checked as of eslint-plugin-vue@9.19.2
 */
export function rules_config_vue_essential() {
    return flatConfigDefineRules({
        "vue/no-dupe-keys":                           ["error"],
        "vue/no-side-effects-in-computed-properties": ["error"],
        "vue/no-ref-as-operand":                      ["error"],
        "vue/no-async-in-computed-properties":        ["error"],
        "vue/no-child-content":                       ["error"],
        "vue/no-dupe-v-else-if":                      ["error"],
        "vue/no-duplicate-attributes":                ["error"],
        "vue/no-export-in-script-setup":              ["error"],
        "vue/no-expose-after-await":                  ["error"],
        "vue/no-lifecycle-after-await":               ["error"],
        "vue/no-reserved-keys":                       ["error"],
        "vue/no-reserved-props":                      ["error"],
        "vue/no-template-key":                        ["error"],
        "vue/no-textarea-mustache":                   ["error"],
        "vue/no-use-v-if-with-v-for":                 ["error"],
        "vue/no-useless-template-attributes":         ["error"],
        "vue/no-v-for-template-key-on-child":         ["error"],
        "vue/no-v-text-v-html-on-component":          ["error"],
        "vue/no-watch-after-await":                   ["error"],
        "vue/prefer-import-from-vue":                 ["error"],
        "vue/require-component-is":                   ["error"],
        "vue/require-render-return":                  ["error"],
        "vue/require-toggle-inside-transition":       ["error"],
        "vue/use-v-on-exact":                         ["error"],
        "vue/valid-attribute-name":                   ["error"],
        "vue/valid-define-emits":                     ["error"],
        "vue/valid-define-props":                     ["error"],
        "vue/valid-next-tick":                        ["error"],
        "vue/valid-template-root":                    ["error"],
        "vue/valid-v-bind":                           ["error"],
        "vue/valid-v-cloak":                          ["error"],
        "vue/valid-v-else-if":                        ["error"],
        "vue/valid-v-else":                           ["error"],
        "vue/valid-v-html":                           ["error"],
        "vue/valid-v-if":                             ["error"],
        "vue/valid-v-is":                             ["error"],
        "vue/valid-v-memo":                           ["error"],
        "vue/valid-v-model":                          ["error"],
        "vue/valid-v-on":                             ["error"],
        "vue/valid-v-once":                           ["error"],
        "vue/valid-v-pre":                            ["error"],
        "vue/valid-v-show":                           ["error"],
        "vue/valid-v-slot":                           ["error"],
        "vue/valid-v-text":                           ["error"],
    });
}

/**
 * All rules checked as of eslint-plugin-vue@9.19.2
 */
export function rules_config_vue_strongly_recommended() {
    return flatConfigDefineRules({
        "vue/attribute-hyphenation":        ["warn"],
        "vue/html-closing-bracket-spacing": ["warn"],
        "vue/html-self-closing":            ["warn", {
            html: {
                void:      "never",
                normal:    "never",
                component: "any",
            },
            svg:  "any",
            math: "any",
        }],
        "vue/html-quotes":                               ["warn", "double", { avoidEscape: true, }],
        "vue/mustache-interpolation-spacing":            ["warn", "always"],
        "vue/no-multi-spaces":                           ["warn", { ignoreProperties: true, }],
        "vue/no-spaces-around-equal-signs-in-attribute": ["warn"],
        "vue/no-template-shadow":                        ["warn"],
        "vue/v-bind-style":                              ["warn", "shorthand"],
        "vue/v-on-event-hyphenation":                    ["warn", "always", { autofix: true, }],
        "vue/v-on-style":                                ["warn", "shorthand"],
        "vue/v-slot-style":                              ["warn", {
            atComponent: "shorthand",
            default:     "shorthand",
            named:       "shorthand",
        }],
    });
}

/**
 * All rules checked as of eslint-plugin-vue@9.19.2
 */
export function rules_config_vue_recommended() {
    return flatConfigDefineRules({
        "vue/attributes-order": ["warn", {
            order: [
                "DEFINITION",
                "SLOT",
                "LIST_RENDERING",
                "CONDITIONALS",
                "RENDER_MODIFIERS",
                "UNIQUE",
                "GLOBAL",
                "OTHER_DIRECTIVES",
                "ATTR_SHORTHAND_BOOL",
                "ATTR_STATIC",
                "TWO_WAY_BINDING",
                "ATTR_DYNAMIC",
                "EVENTS",
                "CONTENT",
            ],
            alphabetical: false,
        }],
        "vue/no-lone-template":      ["warn", { ignoreAccessible: true, }],
        "vue/no-multiple-slot-args": ["warn"],
        "vue/no-v-html":             ["warn"],
    });
}
/**
 * All rules checked as of eslint-plugin-vue@9.19.2
 */
export function rules_config_vue_uncategorized() {
    const globalComponents = ["RouterView", "RouterLink"];
    return flatConfigDefineRules({
        "vue/block-order":                   ["warn", { order: ["template", "script:not([setup])", "script[setup]", "style[scoped]", "style:not([scoped])"], }],
        "vue/no-duplicate-attr-inheritance": ["error"],
        "vue/no-required-prop-with-default": ["error", { autofix: true, }],
        "vue/no-restricted-v-bind":          ["error", {
            argument: "/^v-/",
            message:  "Using `:v-xxx` is not allowed. Instead, remove `:` and use it as directive.",
        }],
        "vue/no-undef-components": ["error", {
            ignorePatterns: [...globalComponents],
        }],
        "vue/no-unused-refs":               ["error"],
        "vue/padding-line-between-blocks":  ["warn", "always"],
        "vue/prefer-define-options":        ["warn"],
        "vue/prefer-separate-static-class": ["error"],
        "vue/require-macro-variable-name":  ["error", {
            defineProps: "props",
            defineEmits: "emit",
            defineSlots: "slots",
            useSlots:    "slots",
            useAttrs:    "attrs",
        }],
        "vue/require-typed-ref":                 ["error"],
        "vue/v-for-delimiter-style":             ["warn", "in"],
        "vue/valid-define-options":              ["error"],
        "vue/block-lang":                        ["error", { script: { lang: "ts", }, }],
        "vue/component-api-style":               ["error", ["script-setup"]],
        "vue/component-name-in-template-casing": ["warn", "PascalCase", {
            registeredComponentsOnly: true,
            ignores:                  [],
            globals:                  [...globalComponents],
        }],
        "vue/custom-event-name-casing": ["warn", "camelCase", {
            ignores: [],
        }],
        "vue/define-emits-declaration": ["warn", "type-literal"],
        "vue/define-props-declaration": ["warn", "type-based"],
        "vue/html-button-has-type":     ["warn", { button: true, submit: false, reset: false, }],
    });
}

/**
 * All rules checked as of eslint-plugin-vue@9.19.2
 */
export function rules_config_vue_extension_rules_forTemplateExpressions() {
    const { getOptionsOf: getOptionsOf_stylistic, } = flatConfigAdoptOptionsFromRules(rules_config_typescript_stylistic());
    return flatConfigDefineRules({
        // "vue/array-bracket-newline":   getOptionsOf_stylistic("@stylistic/array-bracket-newline"),
        "vue/array-bracket-spacing": getOptionsOf_stylistic("@stylistic/array-bracket-spacing"),
        // "vue/array-element-newline":   getOptionsOf_stylistic("@stylistic/array-element-newline"),
        "vue/arrow-spacing":         getOptionsOf_stylistic("@stylistic/arrow-spacing"),
        // "vue/block-spacing":           getOptionsOf_stylistic("@stylistic/block-spacing"),
        // "vue/brace-style":             getOptionsOf_stylistic("@stylistic/brace-style"),
        // "vue/camelcase":               getOptionsOf_stylistic("@stylistic/camelcase"),
        "vue/comma-dangle":          getOptionsOf_stylistic("@stylistic/comma-dangle"),
        "vue/comma-spacing":         getOptionsOf_stylistic("@stylistic/comma-spacing"),
        // "vue/comma-style":             getOptionsOf_stylistic("@stylistic/comma-style"),
        // "vue/dot-location":            getOptionsOf_stylistic("@stylistic/dot-location"),
        // "vue/dot-notation":            getOptionsOf_stylistic("@stylistic/dot-notation"),
        // "vue/eqeqeq":                  getOptionsOf_stylistic("@stylistic/eqeqeq"),
        // "vue/func-call-spacing":       getOptionsOf_stylistic("@stylistic/func-call-spacing"),
        "vue/key-spacing":           getOptionsOf_stylistic("@stylistic/key-spacing"),
        "vue/keyword-spacing":       getOptionsOf_stylistic("@stylistic/keyword-spacing"),
        // "vue/multiline-ternary":       getOptionsOf_stylistic("@stylistic/multiline-ternary"),
        // "vue/no-console":              getOptionsOf_stylistic("@stylistic/no-console"),
        // "vue/no-constant-condition":   getOptionsOf_stylistic("@stylistic/no-constant-condition"),
        // "vue/no-empty-pattern":        getOptionsOf_stylistic("@stylistic/no-empty-pattern"),
        // "vue/no-extra-parens":         getOptionsOf_stylistic("@stylistic/no-extra-parens"),
        // "vue/no-irregular-whitespace": getOptionsOf_stylistic("@stylistic/no-irregular-whitespace"),
        // "vue/no-loss-of-precision":    getOptionsOf_stylistic("@stylistic/no-loss-of-precision"),
        // "vue/no-restricted-syntax":    getOptionsOf_stylistic("@stylistic/no-restricted-syntax"),
        // "vue/no-sparse-arrays":        getOptionsOf_stylistic("@stylistic/no-sparse-arrays"),
        // "vue/no-useless-concat":       getOptionsOf_stylistic("@stylistic/no-useless-concat"),
        // "vue/object-curly-newline":    getOptionsOf_stylistic("@stylistic/object-curly-newline"),
        "vue/object-curly-spacing":  getOptionsOf_stylistic("@stylistic/object-curly-spacing"),
        // "vue/object-property-newline": getOptionsOf_stylistic("@stylistic/object-property-newline"),
        // "vue/object-shorthand":        getOptionsOf_stylistic("@stylistic/object-shorthand"),
        // "vue/operator-linebreak":      getOptionsOf_stylistic("@stylistic/operator-linebreak"),
        // "vue/prefer-template":         getOptionsOf_stylistic("@stylistic/prefer-template"),
        // "vue/quote-props":             getOptionsOf_stylistic("@stylistic/quote-props"),
        "vue/space-in-parens":       getOptionsOf_stylistic("@stylistic/space-in-parens"),
        "vue/space-infix-ops":       getOptionsOf_stylistic("@stylistic/space-infix-ops"),
        // "vue/space-unary-ops":         getOptionsOf_stylistic("@stylistic/space-unary-ops"),
        // "vue/template-curly-spacing":  getOptionsOf_stylistic("@stylistic/template-curly-spacing"),
    });
}
