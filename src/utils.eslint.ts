import type { Rules } from "eslint-define-config";
import type { Simplify } from "type-fest";
/**
 * A simple helper to make working with rules in `@ts-check`-enabled files easier
 * by returning a narrowly typed object with explicitly known keys. Useful when filtering.
 */
export function flatConfigDefineRules<T extends Partial<Rules>>(rules: T) { return rules; }

/**
 * Provide a rules object to receive a getter function that returns the option of the given rule.
 * 
 * Useful for sharing options between a base rule, and a rule that extends the base rule,
 * e.g. in the case of `eslint-plugin-vue` extension rules and the corresponding base `@stylistic` rules.
 */
export function flatConfigAdoptOptionsFromRules<T extends Partial<Rules>>(rules: T) {
    function getOptionsOf<K extends keyof T>(keyOfRule: K) { return rules[keyOfRule]; }
    return { getOptionsOf, };
}

/**
 * Filter rules for debugging purposes by either picking or excluding rules.
 */
export function flatConfigFilterRules<T extends Partial<Rules>, K extends keyof T>(
    rules: T,
    mode: "pick",
    selection: Array<K>,
    debug?: boolean,
): Simplify<Pick<T, K>>
export function flatConfigFilterRules<T extends Partial<Rules>, K extends keyof T>(
    rules: T,
    mode: "exclude",
    selection: Array<K>,
    debug?: boolean,
): Simplify<Omit<T, K>>
export function flatConfigFilterRules<T extends Partial<Rules>, K extends keyof T>(
    rules: T,
    mode: "pick" | "exclude",
    selection: Array<K>,
    debug: boolean = false,
): T {
    if ((mode === "exclude") && (selection.length === 0)) return rules;

    const entries = Object.entries(rules);
    const _rulesFiltered: Record<string, any> = {};
    for (const [key, rule] of entries) {
        if (rule !== void 0) {
            const isEntryRuleInSelection = selection.includes(key as K);
            if ((mode === "pick") && isEntryRuleInSelection) _rulesFiltered[key] = rule;
            if ((mode === "exclude") && !isEntryRuleInSelection) _rulesFiltered[key] = rule;
        }
    }
    const rulesFiltered = _rulesFiltered as T;
    const entriesFiltered = Object.entries(rulesFiltered);
    if (debug) console.info(`Filtered ${entries.length} rules in "${mode}" mode down to ${entriesFiltered.length}:`, rulesFiltered);
    return rulesFiltered;
}
