import { flatConfigDefineRules, flatConfigFilterRules } from "../src";

function sandbox() {
    const rulesAll = flatConfigDefineRules({
        "arrow-spacing": ["error", { before: true, }],
        "brace-style":   ["error"],
    });
    
    const rulesWithFilterPick = flatConfigFilterRules(
        rulesAll,
        "pick",
        [
            "arrow-spacing",
        ]
    );

    const rulesWithFilterExclude = flatConfigFilterRules(
        rulesAll,
        "exclude",
        [
            "arrow-spacing",
        ]
    );
}