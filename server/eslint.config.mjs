import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import boundaries from "eslint-plugin-boundaries";
import globals from "globals";

/**
 * Base ESLint configuration for backend (NestJS)
 * - Enforces TypeScript safety
 * - Enforces architecture boundaries
 * - Prevents bad patterns
 */

export default [
  js.configs.recommended,

  {
    files: ["**/*.ts"],

    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.node
      }
    },

    plugins: {
      "@typescript-eslint": tsPlugin,
      boundaries
    },

    settings: {
      /**
       * Architecture layer definitions
       * Used by eslint-plugin-boundaries
       */
      "boundaries/elements": [
        {
          type: "domain",
          pattern: "src/modules/**/domain/**/*"
        },
        {
          type: "application",
          pattern: "src/modules/**/application/**/*"
        },
        {
          type: "infrastructure",
          pattern: "src/modules/**/infrastructure/**/*"
        },
        {
          type: "presentation",
          pattern: "src/modules/**/presentation/**/*"
        }
      ],

    },

    rules: {
      /**
       * Prevent debugging logs in production code
       */
      "no-console": "warn",

      /**
       * Enforce clean TypeScript usage
       */
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",

      /**
       * Enforce function return type clarity
       */
      "@typescript-eslint/explicit-function-return-type": "warn",

      /**
       * Naming conventions for consistency
       */
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": "variable",
          "format": ["camelCase", "UPPER_CASE"]
        },
        {
          "selector": "function",
          "format": ["camelCase"]
        },
        {
          "selector": "class",
          "format": ["PascalCase"]
        }
      ],

      /**
       * Architecture enforcement rules
       */
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            { from: "domain", allow: [] },
            { from: "application", allow: ["domain"] },
            { from: "infrastructure", allow: ["domain", "application"] },
            { from: "presentation", allow: ["application"] }
          ]
        }
      ]
    },
  },
  {
    files: [
      "src/common/logger/**/*.ts",
      "src/config/**/*.ts"
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "no-console": "off" 
    }
  }
];