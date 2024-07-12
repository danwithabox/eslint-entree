// @ts-check
import { entreeDefineRules, entree_rules_typeScript, entree_rules_vue3, entreeFilterRules, defineFlatConfig, entreeConfigs } from "@danwithabox/eslint-entree";

const typescriptRules = entreeFilterRules(
    entreeDefineRules({
        ...entree_rules_typeScript(),
    }),
    {
        exclude: [],
    },
);
const vue3Rules = entreeFilterRules(
    entreeDefineRules({
        ...entree_rules_vue3(),
    }),
    {
        exclude: [],
    },
);

export default defineFlatConfig([
    ...entreeConfigs.vue3Example({ typescriptRules, vue3Rules, gitignore: true, }),
]);
