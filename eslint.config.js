import antfu from '@antfu/eslint-config'
import vue35Plugin from './eslint-plugin-vue35/index.js'

export default antfu(
  {
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
      markdown: false,
    },

    plugins: {
      vue35: vue35Plugin,
    },

    rules: {
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue35/no-with-defaults': 'error',
      'no-else-return': 'error',

      'prefer-const': 'error',
      'no-var': 'error',
      'no-param-reassign': 'error',
      'vue/no-mutating-props': 'error',
      'prefer-template': 'error',
      'template-curly-spacing': 'error',
      'no-array-constructor': 'error',
      'prefer-spread': 'error',
      'prefer-rest-params': 'error',
      'no-loop-func': 'error',
      'prefer-arrow-callback': 'error',
      'arrow-spacing': 'error',
      'no-confusing-arrow': 'error',
      'prefer-destructuring': ['error', {
        array: true,
        object: true,
      }, {
        enforceForRenamedProperties: false,
      }],
      'no-useless-return': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'vue/no-unused-vars': 'error',
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-return-assign': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-throw-literal': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unused-expressions': 'error',
      'no-useless-call': 'error',
      'no-useless-concat': 'error',
      'no-useless-constructor': 'error',
      'no-useless-rename': 'error',
      'no-void': 'error',
      'prefer-promise-reject-errors': 'error',
      'require-await': 'error',
      'yoda': 'error',
    },
  },
  {
    files: ['pages/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    ignores: ['**/*.md'],
  },
)
