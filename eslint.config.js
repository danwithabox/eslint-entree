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
const reactRules = entreeFilterRules(entreeRules.react(), {
    exclude: [],
});

export default defineFlatConfig([
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
