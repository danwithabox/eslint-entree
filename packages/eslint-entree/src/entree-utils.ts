import type { Linter } from "eslint";
import type { RuleOptions as _stylistic_RuleOptions } from "@stylistic/eslint-plugin";
import type { RuleOptions as _vue_RuleOptions } from "eslint-plugin-vue/lib/eslint-typegen";
import type { Simplify } from "type-fest";

type stylistic_RuleOptions = {[K in keyof _stylistic_RuleOptions]?: Linter.RuleEntry<_stylistic_RuleOptions[K]> };

// Explicit augmentation even if the packages, e.g. "eslint-plugin-vue/lib/eslint-typegen" already do it, to help the reader in learning
declare module "eslint" {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Linter {
        // TODO: react types, maybe with eslint-typegen if needed
        interface RulesRecord extends stylistic_RuleOptions, _vue_RuleOptions {}
    }
}

/**
 * A simple helper to make working with rules in `@ts-check`-enabled files easier
 * by returning a narrowly typed object with explicitly known keys.
 * 
 * Needed for {@link entreeFilterRules} to work correctly.
 * 
 * Is not not needed for ESLint otherwise.
 */
export function entreeDefineRules<T extends Linter.RulesRecord>(rules: T) { return rules; }

/**
 * Provide a rules object to receive a getter function that returns the option of the given rule.
 * 
 * Useful for sharing options between a base rule, and a rule that extends the base rule,
 * e.g. in the case of `eslint-plugin-vue` extension rules and the corresponding base `@stylistic` rules.
 */
export function entreeAdoptOptionsFromRules<T extends Linter.RulesRecord>(rules: T) {
    function getOptionsOf<K extends keyof T>(keyOfRule: K): NonNullable<T[K]> {
        const rule = rules[keyOfRule];
        if (!rule) console.warn(`[entree-utils.ts] Unexpectedly missing rule: "${String(keyOfRule)}". Rules:`, rules);
        return rule;
    }
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
    T extends Linter.RulesRecord,
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
    const rulesFiltered: Linter.RulesRecord = {};

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
