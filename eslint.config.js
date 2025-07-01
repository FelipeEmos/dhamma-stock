import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";
import checkFile from "eslint-plugin-check-file";
import { defineConfig, globalIgnores } from "eslint/config";

/**
 * @type {import("typescript-eslint").ConfigWithExtends}
 */
const mainConfig = {
  files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  languageOptions: { globals: { ...globals.browser, ...globals.node } },
  plugins: {
    js,
    prettier,
    "react-hooks": pluginReactHooks,
  },
  extends: ["js/recommended"],
  rules: {
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": "off",
    "react/no-children-prop": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-namespace": "off", // Allow namespaces for code organization
    "no-redeclare": "off", // Deprecated if using Typescript https://typescript-eslint.io/rules/no-redeclare/
    // NOTE: rules of hooks keeps complaining about the use of the word "use"
    // in some "not React Code" because it's pretty common on Effect too
    // "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    ...eslintConfigPrettier.rules,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};

export default defineConfig([
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  mainConfig,

  // ---
  // File Naming conventions
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "check-file": checkFile,
    },
    rules: {
      "check-file/filename-naming-convention": [
        "error",
        {
          // EXCEPTIONS:
          // Tanstack Router and Astro routes have special naming conventions
          // Ignore routes that start with _, - or [ as they conflict with the naming convention
          "*/**/[^_-\\[]*.{ts,tsx,astro}": "KEBAB_CASE",
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
    },
  },
  // ---

  globalIgnores([
    "*.gen.ts",
    "*-lock.yaml",
    "dist",
    "build",
    ".vscode",
    ".vercel",
    ".output",
  ]),
]);
