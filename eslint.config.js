// @ts-check
import { defineConfig, entreeFilterRules, entreeConfigs, entreeRules } from "@danwithabox/eslint-entree";

const typeScriptRules = entreeFilterRules({
    ...entreeRules.typeScript(),
    "@stylistic/indent": ["warn", 4],
}, {
    exclude: [],
});
const vue3Rules = entreeFilterRules({
    ...entreeRules.vue3(),
    "@stylistic/indent":       ["warn", 4],
    "vue/script-indent":       ["warn", 4], // This may conflict with `@stylistic/indent` as described here: https://eslint.vuejs.org/rules/script-indent.html#options
    "vue/html-indent":         ["warn", 4],
    "vue/html-comment-indent": ["warn", 4],
}, {
    // exclude: ["@stylistic/indent"],
    exclude: ["vue/script-indent"], // Comment out the other line instead of this, to compare the two rules
});
const reactRules = entreeFilterRules({
    ...entreeRules.react(),
}, {
    exclude: [],
});

export default defineConfig([
    // In actual use cases, you should only have one of these used: either `.typeScript`, `.vue3`, or `.react` - you don't need `.typeScript` for `.vue3` or `.react`
    ...entreeConfigs.typeScript({
        typeScriptRules,
        gitignore: true,
    }),
    ...entreeConfigs.vue3({
        typeScriptRules,
        vue3Rules,
        gitignore: true,
    }),
    ...entreeConfigs.react({
        typeScriptRules,
        reactRules,
        gitignore: true,
    }),
]);
