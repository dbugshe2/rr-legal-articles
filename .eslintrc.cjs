const vitest = require("eslint-plugin-vitest");
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  globals: {
    ...vitest.environments.env.globals
  },
  extends: [
    // get recommended rules without having to manually extend
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:react-hooks/recommended",
    "plugin:vitest/recommended",
    "eslint-config-prettier",
  ],

  settings: {
    react: {
      version: "detect",
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".d.ts", ".tsx"],
      },
      typescript: {
        alwaysTryTypes: true,
        project: ["./tsconfig.json", "./tsconfig.node.json"],
      },
      alias: {
        map: [
          ["", "./src"],
          ["/", "./public"],
          ["ui", "./src/ui"],
          ["app", "./src/app"],
          ["assets", "./src/assets"],
          ["test", "./test"],
        ],
      },
    },
  },
  ignorePatterns: [
    "dist",
    ".eslintrc.cjs",
    "tailwind.config.js",
    "tsconfig.json",
    "tsconfig.node.json",
    "node_modules",
    ".prettierrc.json",
    "env.d.ts",
    "setupTests.ts",
    "commitlint.config.cjs",
    "postcss.config.js",
    "vite.config.ts"
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "import", "vitest"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "import/no-unresolved": "error",
    "@typescript-eslint/no-unsafe-assignment": "warn",
    "@typescript-eslint/no-unsafe-call": "warn",
    "@typescript-eslint/no-unsafe-member-access": "warn",
    "@typescript-eslint/no-unsafe-return": "warn",
    "@typescript-eslint/no-unsafe-argument": "warn",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    ...vitest.configs.recommended.rules,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
  },
};
