import configXo from "eslint-config-xo";

export default [
  ...configXo,
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error", "log"] }],
      "no-unused-vars": ["error", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_" 
      }],
      "no-debugger": "error",
      "no-duplicate-imports": "error",
      "no-shadow": "error",
      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-template": "error"
    },
  },
];
