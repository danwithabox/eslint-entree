// @ts-check
// Run `npm run build` and `npm install ./` to use the library with the import the end-users would use it with
import { defineFlatConfig, entreeFilterRules, entreeConfigs, entreeRules } from "@danwithabox/eslint-entree";
// Without those steps, e.g. when developing, use this import line instead:
// import { defineFlatConfig, entreeFilterRules, entreeConfigs, entreeRules } from "./src/index";

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
