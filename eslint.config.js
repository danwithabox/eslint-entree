// @ts-check
import { defineConfig, entreeFilterRules, entreeConfigs, entreeRules } from "@danwithabox/eslint-entree";

const typeScriptRules = entreeFilterRules(entreeRules.typeScript(), {
    exclude: [],
});
const vue3Rules = entreeFilterRules(entreeRules.vue3(), {
    exclude: [],
});
const reactRules = entreeFilterRules(entreeRules.react(), {
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
