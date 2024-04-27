import { flatConfigDefineRules, flatConfigFilterRules } from "../src";

function sandbox() {
    const rulesAll = flatConfigDefineRules({
        "arrow-spacing":                    ["error", { before: true, }],
        "brace-style":                      ["error"],
        "@stylistic/no-trailing-spaces":    ["warn", { ignoreComments: true, }],
    });

    const rulesWithFilter0 = flatConfigFilterRules(rulesAll, {
        exclude: [],
    });
    const rulesWithFilter1 = flatConfigFilterRules(rulesAll, {
        exclude: ["brace-style"],
    });
    const rulesWithFilter2 = flatConfigFilterRules(rulesAll, {
        exclude: ["brace-style"],
        pick:    ["arrow-spacing", "@stylistic/no-trailing-spaces"],
    });
    const rulesWithFilter3 = flatConfigFilterRules(rulesAll, {
        exclude: ["brace-style"],
        pick:    [],
    });
}