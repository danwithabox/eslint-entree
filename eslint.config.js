// @ts-check
import { defineFlatConfig, entreeConfigVue3SOTA, rules_config_typescript, rules_config_vue, flatConfigFilterRules, flatConfigDefineRules } from "@danwithabox/eslint-entree";

const typescript = flatConfigFilterRules(
    flatConfigDefineRules({
        ...rules_config_typescript(),
    }),
    {
        exclude: [],
    },
);
const vue = flatConfigFilterRules(
    flatConfigDefineRules({
        ...rules_config_vue(),
    }),
    {
        exclude: [],
    },
);

export default defineFlatConfig([
    ...entreeConfigVue3SOTA({ typescript, vue, }),
]);
