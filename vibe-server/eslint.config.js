import js from "@eslint/js";
import parser from "@typescript-eslint/parser";
import plugin from "@typescript-eslint/eslint-plugin";

export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },

  js.configs.recommended, // base JS rules

  {
    files: ["**/*.ts"],
    languageOptions: {
      parser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
        project: "./tsconfig.json",
        ecmaFeatures: {
          legacyDecorators: true, // enable decorators support if you use them
        },
      },
      globals: {
        console: "readonly",
        process: "readonly",
        __dirname: "readonly",
        module: "readonly",
        require: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": plugin,
    },
    rules: {
      ...plugin.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": ["error"],
    },
  },
];
