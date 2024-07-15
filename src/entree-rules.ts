import * as rules_typeScript from "./eslint-sample-js/rules-typescript.entree";
import * as rules_vue3 from "./eslint-sample-js/rules-vue3.entree";

/**
 * Every collection of hand-picked rules.
 */
export const entreeRules = {
    ...rules_typeScript,
    ...rules_vue3,
};
