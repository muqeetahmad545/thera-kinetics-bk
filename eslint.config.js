import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, 
      },
    },
  },
  pluginJs.configs.recommended,
  {
    env: {
      browser: true,  
      node: true,     
      es2021: true,  
    },
    rules: {
      'no-console': 'warn',  
      'no-unused-vars': 'warn', 
    },
  },
];
