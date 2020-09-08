
module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    "airbnb-base",
    "prettier"
  ],
  plugins: [
    "only-warn"
  ],
  parser: "babel-eslint",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  rules: {
    "class-methods-use-this": 0,
    "no-underscore-dangle": 0,
    "no-restricted-syntax": ["error", "LabeledStatement", "WithStatement"]
  },
}
