module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended'],
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    'space-before-function-paren': 0,
    'vue/html-self-closing': 'off',
    'no-prototype-builtins': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
