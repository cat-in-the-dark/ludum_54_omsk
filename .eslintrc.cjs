/** @type {import("eslint").Linter.Config} */
const config = {
  extends: ["eslint:recommended", "prettier"],
  env: {
    es2022: true,
    node: true,
    browser: true,
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
    CELL_SIZE: "readonly",
    Z_CONSTRAINT: "readonly",
    OFFSET: "readonly",
    SNAP: "readonly",
    getPosInGrid: "readonly",
    CELLS_Y: "readonly",
    CELLS_X: "readonly",
    GROUND_Y: "readonly",
    SPAWN_TIMER: "readonly",
    GRAVITY_SPEED: "readonly",
  },
};

module.exports = config;
