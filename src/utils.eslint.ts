import type { Rules } from "eslint-define-config";
import type { Simplify } from "type-fest";
/**
 * A simple helper to make working with rules in `@ts-check`-enabled files easier
 * by returning a narrowly typed object with explicitly known keys. Useful when filtering.
 */
export function entreeDefineRules<T extends Partial<Rules>>(rules: T) { return rules; }

/**
 * Provide a rules object to receive a getter function that returns the option of the given rule.
 * 
 * Useful for sharing options between a base rule, and a rule that extends the base rule,
 * e.g. in the case of `eslint-plugin-vue` extension rules and the corresponding base `@stylistic` rules.
 */
export function entreeAdoptOptionsFromRules<T extends Partial<Rules>>(rules: T) {
    function getOptionsOf<K extends keyof T>(keyOfRule: K) { return rules[keyOfRule]; }
    return { getOptionsOf, };
}

/**
 * Filter rules for adoption or debugging purposes by excluding and picking rules.
 * 
 * ---
 * 
 * Filtering is meant to help in the adoption process.
 * 
 * Ideally, the filtering is entirely removed after processing the whole codebase, and all rules are fully covering the code.
 * 
 * - `exclude` is used to cut down on the printed result of eslint, to set aside rules that overwhelm the output
 * - `pick` is used to select from the remaining results the ones you currently want to fix, and to verify their adoption
 * 
 * After the rule(s) in `pick` are done, run eslint again, and pick again from the results.
 * 
 * After everything you picked is done, process the rules that you previously excluded, if there were any.
 */
export function entreeFilterRules<
    T extends Partial<Rules>,
    const TExcludeKeys extends keyof T,
    const TPickableKeys extends keyof Omit<T, TExcludeKeys>
>(
    rules: T,
    opts?: |(
        | { exclude: readonly TExcludeKeys[], pick?: undefined, debug?: boolean, }
        | { exclude: readonly TExcludeKeys[], pick: TPickableKeys[], debug?: boolean, }
    ),
): Simplify<Pick<Omit<T, TExcludeKeys>, TPickableKeys>> {
    if (opts === void 0) return rules;

    const { exclude, pick, debug = false, } = opts;
    const rulesFiltered: Partial<Rules> = {};

    if (pick !== void 0) {
        for (const key_picked of pick) rulesFiltered[key_picked as string] = rules[key_picked];
    } else {
        for (const [key, rule] of Object.entries(rules)) rulesFiltered[key] = rule;
        for (const key_excluded of exclude) delete rulesFiltered[key_excluded as string];
    }

    if (debug) {
        const count_rules: number = Object.keys(rules).length;
        const count_filtered: number = Object.keys(rulesFiltered).length;
        console.info(`Filtered ${count_rules} rules down to ${count_filtered}. Result:`, rulesFiltered);
    }

    return rulesFiltered as T;
}
