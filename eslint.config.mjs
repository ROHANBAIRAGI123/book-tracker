import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "src/generated/**/*",
      "**/generated/**/*",
      "node_modules/**/*",
      ".next/**/*",
      "dist/**/*",
      "build/**/*"
    ]
  },
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
  }),
]

export default eslintConfig;
