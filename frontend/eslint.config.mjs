import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Flags the standard "fetch on mount, track a loading flag" pattern
      // used throughout the admin panel's client components. That pattern
      // is intentional here, not a bug — this project doesn't use it.
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
