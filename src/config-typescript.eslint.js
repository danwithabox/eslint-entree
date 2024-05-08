//@ts-check
/// <reference types="@stylistic/eslint-plugin/define-config-support" />
import { defineFlatConfig } from "eslint-define-config";
import { flatConfigDefineRules } from "./utils.eslint";
import plugin_stylistic from "@stylistic/eslint-plugin";
import tseslint from "typescript-eslint";

/**
 * Provides the needed plugin and parser config.
 * 
 * @template { Partial<import("eslint-define-config").Rules> } T
 * @param { T } rules
 */
export function config_typescript(rules) {
    const GLOB_SRC = "**/*.?([cm])[jt]s";
    const flatConfig_typescript = defineFlatConfig({
        files:   [GLOB_SRC],
        plugins: {
            /** @type { import("@stylistic/eslint-plugin/define-config-support") } */
            "@stylistic":         plugin_stylistic,
            /** @type { any } */
            "@typescript-eslint": tseslint.plugin,
        },
        languageOptions: {
            parser:        tseslint.parser,
            parserOptions: {
                sourceType: "module",
            },
        },
        rules,
    });
    return flatConfig_typescript;
}

export function rules_config_typescript() {
    const rules = flatConfigDefineRules({
        ...rules_config_typescript_eslint(),
        ...rules_config_typescript_stylistic(),
        ...rules_config_typescript_filteredBy_recommended(),
        ...rules_config_typescript_filteredBy_tsstylistic(),
        ...rules_config_typescript_filteredBy_strict(),
        ...rules_config_typescript_filteredBy_miscellaneous(),
    });

    return rules;
}

export function rules_config_typescript_eslint() {
    return flatConfigDefineRules({
        "no-compare-neg-zero":          ["error"],
        "no-debugger":                  ["error"],
        "no-irregular-whitespace":      ["error", { skipComments: true, skipJSXText: true, skipRegExps: true, skipStrings: true, skipTemplates: true, }],
        "no-promise-executor-return":   ["warn", { allowVoid: true, }],
        "no-self-assign":               ["warn", { props: true, }],
        "no-self-compare":              ["warn"],
        "require-atomic-updates":       ["error", { allowProperties: true, }],
        "use-isnan":                    ["warn", { enforceForSwitchCase: true, enforceForIndexOf: true, }],
        "no-caller":                    ["error"],
        "eqeqeq":                       ["warn", "always", { null: "always", }],
        "default-case-last":            ["warn"],
        "default-case":                 ["warn", { commentPattern: "^skip\\sdefault", }],
        "no-implicit-coercion":         ["warn", { boolean: true, number: true, string: true, disallowTemplateShorthand: false, allow: [], }],
        "no-octal":                     ["warn"],
        "no-nonoctal-decimal-escape":   ["warn"],
        "no-throw-literal":             ["warn"],
        "no-undefined":                 ["warn"],
        "no-useless-escape":            ["warn"],
        "no-useless-rename":            ["warn", { ignoreImport: false, ignoreExport: false, ignoreDestructuring: false, }],
        "no-var":                       ["warn"],
        "prefer-const":                 ["warn", { destructuring: "all", ignoreReadBeforeAssign: false, }],
        "prefer-promise-reject-errors": ["warn", { allowEmptyReject: false, }],
        "prefer-template":              ["warn"],
        "require-unicode-regexp":       ["warn"],
        "symbol-description":           ["warn"],
    });
}

export function rules_config_typescript_stylistic() {
    return flatConfigDefineRules({
        "@stylistic/type-annotation-spacing":     ["warn", { before: false, after: true, overrides: { arrow: { before: true, after: true, }, }, }],
        "@stylistic/space-before-function-paren": ["warn", { anonymous: "always", named: "never", asyncArrow: "always", }],
        "@stylistic/semi":                        ["warn", "always"],
        "@stylistic/no-extra-semi":               ["warn"],
        "@stylistic/no-trailing-spaces":          ["warn", { ignoreComments: true, }],
        "@stylistic/space-infix-ops":             ["warn", { int32Hint: true, }],
        "@stylistic/object-curly-spacing":        ["warn", "always", { arraysInObjects: false, objectsInObjects: false, }],
        "@stylistic/comma-spacing":               ["warn", { before: false, after: true, }],
        "@stylistic/keyword-spacing":             ["warn", { before: true, after: true, }],
        "@stylistic/quotes":                      ["warn", "double", { avoidEscape: true, allowTemplateLiterals: true, }],
        "@stylistic/space-in-parens":             ["warn", "never"],
        "@stylistic/array-bracket-spacing":       ["warn", "never"],
        "@stylistic/arrow-spacing":               ["warn"],
        "@stylistic/eol-last":                    ["warn", "always"],
        "@stylistic/comma-dangle":                ["warn", {
            arrays:    "always-multiline",
            objects:   "always",
            imports:   "never",
            exports:   "always-multiline",
            functions: "always-multiline",
        }],
        "@stylistic/member-delimiter-style": ["warn", {
            singleline: {
                delimiter:   "comma",
                requireLast: true,
            },
            multiline: {
                delimiter:   "comma",
                requireLast: true,
            },
            multilineDetection: "brackets",
        }],
        "@stylistic/key-spacing": ["warn", {
            singleLine: {
                beforeColon: false,
                afterColon:  true,
            },
            multiLine: {
                beforeColon: false,
                afterColon:  true,
            },
            align: {
                beforeColon: false,
                afterColon:  true,
                on:          "value",
            },
        }],
    });
}

/** Subset selected from https://typescript-eslint.io/rules/?=recommended-xtypeInformation */
export function rules_config_typescript_filteredBy_recommended() {
    return flatConfigDefineRules({
        "@typescript-eslint/ban-ts-comment": ["error", {
            "ts-expect-error": "allow-with-description",
            "ts-ignore":       "allow-with-description",
            "ts-nocheck":      "allow-with-description",
            "ts-check":        false,
        }],
        "@typescript-eslint/ban-types": ["error", {
            extendDefaults: true,
            types:          {},
        }],
        "@typescript-eslint/no-duplicate-enum-values": ["error"],

        "no-loss-of-precision":                    ["off"],
        "@typescript-eslint/no-loss-of-precision": ["error"],
        "@typescript-eslint/no-misused-new":       ["error"],
        "@typescript-eslint/no-namespace":         ["error", {
            allowDeclarations:    false,
            allowDefinitionFiles: true,
        }],
        "@typescript-eslint/no-unnecessary-type-constraint": ["error"],
        "@typescript-eslint/no-unsafe-declaration-merging":  ["error"],
        "@typescript-eslint/prefer-as-const":                ["error"],
    });
}

/** Subset selected from https://typescript-eslint.io/rules/?=stylistic-xtypeInformation */
export function rules_config_typescript_filteredBy_tsstylistic() {
    return flatConfigDefineRules({
        "@typescript-eslint/consistent-type-assertions": ["error", {
            assertionStyle:              "as",
            objectLiteralTypeAssertions: "allow-as-parameter",
        }],
        "@typescript-eslint/no-confusing-non-null-assertion": ["error"],
    });
}

/** Subset selected from https://typescript-eslint.io/rules/?=xrecommended-strict-xstylistic-xtypeInformation */
export function rules_config_typescript_filteredBy_strict() {
    return flatConfigDefineRules({
        "@typescript-eslint/no-invalid-void-type": ["error", {
            allowInGenericTypeArguments: true,
            allowAsThisParameter:        true,
        }],
        "@typescript-eslint/no-non-null-assertion":  ["error"],
        "@typescript-eslint/prefer-ts-expect-error": ["error"],
    });
}

/** Subset selected from https://typescript-eslint.io/rules/?=xrecommended-xstrict-xstylistic-xtypeInformation-xdeprecated */
export function rules_config_typescript_filteredBy_miscellaneous() {
    return flatConfigDefineRules({
        "@typescript-eslint/no-import-type-side-effects": ["warn"],

        "no-unused-expressions":                    ["off"],
        "@typescript-eslint/no-unused-expressions": ["error", {
            allowShortCircuit:    true,
            allowTernary:         true,
            allowTaggedTemplates: true,
        }],

        "@typescript-eslint/no-useless-empty-export": ["error"],
    });
}
