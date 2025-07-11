import * as rules_typeScript from "./eslint-sample-js/rules-typescript.entree.js";
import * as rules_vue3 from "./eslint-sample-js/rules-vue3.entree.js";
import * as rules_react from "./eslint-sample-js/rules-react.entree.js";

/**
 * Every collection of hand-picked rules.
 */
export const entreeRules = {
    ...rules_typeScript,
    ...rules_vue3,
    ...rules_react,
};
