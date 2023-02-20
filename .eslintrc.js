/* global */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: ['plugin:vue/vue3-recommended', 'eslint:recommended', 'standard'],
  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/singleline-html-element-content-newline': ['warn'],
    'vue/new-line-between-multi-line-property': ['warn'],
    'vue/html-self-closing': ['warn'],
    'vue/v-on-event-hyphenation': ['warn'],
    'vue/attributes-order': ['warn'],
    'vue/multi-word-component-names': ['error', {
      ignores: ['Home', 'Settings']
    }]
  },
  globals: {
    _: true
  }
}
