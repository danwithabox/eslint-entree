// @ts-check
import { defineFlatConfig, entreeFilterRules, entreeConfigs, entreeRules } from "@danwithabox/eslint-entree";

const typeScriptRules = entreeFilterRules(entreeRules.typeScript(), {
    exclude: [],
});
const vue3Rules = entreeFilterRules(entreeRules.vue3(), {
    exclude: [],
});

export default defineFlatConfig([
    ...entreeConfigs.vue3({
        typeScriptRules,
        vue3Rules,
        gitignore: true,
    }),
]);
