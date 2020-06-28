module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,//也就是ES6语法支持的意思
    sourceType: "module",
    ecmaFeatures: {
      modules: true
    },
    project: "./tsconfig.json"
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['@typescript-eslint'],
  rules: {
      // 禁止使用 var
      'no-var': "error",
      // 不检查属性名称
      "properties": "off",
      '@typescript-eslint/camelcase': "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      '@typescript-eslint/no-explicit-any': "off",
      // 优先使用 interface 而不是 type
      '@typescript-eslint/consistent-type-definitions': [
          "error",
          "interface"
      ]
  }
}