import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  unocss: true,

  stylistic: {
    indent: 2,
    quotes: 'single',
  },

  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
  },

  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/multi-word-component-names': ['error', {
      ignores: ['index', 'default'],
    }],
  },
})
