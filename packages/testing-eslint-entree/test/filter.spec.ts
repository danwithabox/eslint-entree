import { entreeDefineRules, entreeFilterRules } from "@danwithabox/eslint-entree";

function sandbox() {
    const rulesAll = entreeDefineRules({
        "arrow-spacing":                 ["error", { before: true, }],
        "brace-style":                   ["error"],
        "@stylistic/no-trailing-spaces": ["warn", { ignoreComments: true, }],
    });

    const rulesWithFilter0 = entreeFilterRules(rulesAll, {
        exclude: [],
    });
    const rulesWithFilter1 = entreeFilterRules(rulesAll, {
        exclude: ["brace-style"],
    });
    const rulesWithFilter2 = entreeFilterRules(rulesAll, {
        exclude: ["brace-style"],
        pick:    ["arrow-spacing", "@stylistic/no-trailing-spaces"],
    });
    const rulesWithFilter3 = entreeFilterRules(rulesAll, {
        exclude: ["brace-style"],
        pick:    [],
    });
}
