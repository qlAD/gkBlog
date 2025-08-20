/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ["next-typescript"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  rules: {
    // 禁用pages目录检查规则，解决警告
    "next/no-html-link-for-pages": "off"
  }
};
    