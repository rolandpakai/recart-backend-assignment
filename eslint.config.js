const tseslint = require("typescript-eslint");
const js = require("@eslint/js");
const globals = require('globals');
// const stylistic = require('@stylistic/eslint-plugin');

module.exports = [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  // stylistic.configs['recommended-flat'],
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.node
      }
    },
  },
  {
    ignores: [
      "coverage",
      "dist",
      "junit",
      "tests",
      "eslint.config.js",
      "init-mongo.js",
    ],
  },
  {
    rules: {
      "no-plusplus": "error",
      "no-duplicate-imports": "error",
      "object-shorthand": "error",
      "no-console": ["error", {
        "allow": ["warn", "error", "debug"]
      }],
      "prefer-const": ["error", {
        "destructuring": "all"
      }],
      // "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", {
        "vars": "all",
        "args": "after-used"
      }],

      // TODO: Re-enable rules:
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "prefer-promise-reject-errors": "off",
      "@typescript-eslint/prefer-promise-reject-errors": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-unsafe-enum-comparison": "off",
      "@typescript-eslint/no-base-to-string": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-return" : "off",


      // Formaters

      // "no-multiple-empty-lines": [2, {"max": 2, "maxEOF": 0}],
      "@typescript-eslint/naming-convention": "off",
      // "@stylistic/no-extra-semi": "error",
      // "@stylistic/semi": ["error", "always"],
      // "@stylistic/quotes": ["error", "double"],
      // "@stylistic/comma-dangle": ["error", "only-multiline"],
      // "@stylistic/eol-last": ["error", "never"],
      // "@stylistic/brace-style": ["error","1tbs", {"allowSingleLine": true}],
      // "@stylistic/indent": ["error", 2]
    },
  },
];
