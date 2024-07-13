import { defineFlatConfig, type Rules, type FlatESLintConfig } from "eslint-define-config";
import { config_typescript } from "./eslint-sample-js/config-typescript.entree.js";
import { config_vue } from "./eslint-sample-js/config-vue3.entree.js";
import { gitignore } from "./index.js";

function typeScript(config: { typeScriptRules: Partial<Rules>, gitignore: boolean, }): Array<FlatESLintConfig> {
    const { typeScriptRules, gitignore: _gitignore, } = config;

    return defineFlatConfig([
        ...(_gitignore ? [gitignore()] : []),
        config_typescript(typeScriptRules),
    ]);
}

function vue3(config: {
    typeScriptRules: Partial<Rules>,
    vue3Rules:       Partial<Rules>,
    gitignore:       boolean,
}): Array<FlatESLintConfig> {
    const { typeScriptRules, vue3Rules, gitignore: _gitignore, } = config;

    return defineFlatConfig([
        ...(_gitignore ? [gitignore()] : []),
        config_typescript(typeScriptRules),
        config_vue({ ...typeScriptRules, ...vue3Rules, }),
    ]);
}

export const entreeConfigs = {
    typeScript,
    vue3,
};
