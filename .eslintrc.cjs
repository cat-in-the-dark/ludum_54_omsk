/** @type {import("eslint").Linter.Config} */
const config = {
  extends: ["eslint:recommended", "prettier"],
  env: {
    es2022: true,
    node: true,
  },
  parserOptions: {
    project: true,
  },
  plugins: ["import"],
  rules: {
    "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
  },
  ignorePatterns: [
    "**/.eslintrc.cjs",
    "**/*.config.js",
    "**/*.config.cjs",
    ".next",
    "dist",
    "pnpm-lock.yaml",
  ],
  reportUnusedDisableDirectives: true,
  globals: {
    AFRAME: "readonly",
    THREE: "readonly",
    MutationObserver: "readonly",
  },
};

module.exports = config;
