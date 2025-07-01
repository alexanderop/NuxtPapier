import antfu from '@antfu/eslint-config'
import vue35Plugin from './eslint-plugin-vue35/index.js'

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

  plugins: {
    vue35: vue35Plugin,
  },

  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/multi-word-component-names': ['error', {
      ignores: ['index', 'default'],
    }],
    'vue35/no-with-defaults': 'error',
  },
})
