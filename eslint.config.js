import antfu from '@antfu/eslint-config'
import sortKeysFixPlugin from 'eslint-plugin-sort-keys-fix'
import vue35Plugin from './eslint-plugin-vue35/index.js'

export default antfu(
  {
    formatters: {
      css: true,
      html: true,
      markdown: false,
    },
    plugins: {
      'sort-keys-fix': sortKeysFixPlugin,
      'vue35': vue35Plugin,
    },
    rules: {
      'arrow-spacing': 'error',
      'no-array-constructor': 'error',
      'no-confusing-arrow': 'error',
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-else-return': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-loop-func': 'error',
      'no-new-func': 'error',
      'no-param-reassign': 'error',
      'no-return-assign': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-throw-literal': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unused-expressions': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-useless-call': 'error',
      'no-useless-concat': 'error',
      'no-useless-constructor': 'error',
      'no-useless-rename': 'error',
      'no-useless-return': 'error',
      'no-var': 'error',
      'no-void': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'prefer-destructuring': ['error', {
        array: true,
        object: true,
      }, {
        enforceForRenamedProperties: false,
      }],
      'prefer-promise-reject-errors': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      'require-await': 'error',
      'sort-keys-fix/sort-keys-fix': 'error',
      'template-curly-spacing': 'error',
      'vue/block-lang': ['error', {
        script: {
          lang: 'ts',
        },
      }],
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/define-emits-declaration': ['error', 'type-based'],
      'vue/define-macros-order': ['error', {
        defineExposeLast: true,
        order: ['defineProps', 'defineEmits'],
      }],
      'vue/define-props-declaration': ['error', 'type-based'],
      'vue/define-props-destructuring': ['error', {
        destructure: 'always',
      }],
      'vue/html-button-has-type': 'error',
      'vue/max-template-depth': ['error', { maxDepth: 8 }],
      'vue/no-mutating-props': 'error',
      'vue/no-ref-object-reactivity-loss': 'error',
      'vue/no-unused-emit-declarations': 'error',
      'vue/no-unused-properties': ['error', {
        deepData: true,
        groups: ['props', 'data', 'computed', 'methods', 'setup'],
      }],
      'vue/no-unused-vars': 'error',
      'vue/no-use-v-else-with-v-for': 'error',
      'vue/prefer-true-attribute-shorthand': 'error',
      'vue/require-prop-comment': 'error',
      'vue/require-typed-ref': 'error',
      'vue/sort-keys': 'off',
      'vue/v-for-delimiter-style': ['error', 'in'],
      'vue35/no-with-defaults': 'error',
      'yoda': 'error',
    },

    stylistic: {
      indent: 2,
      quotes: 'single',
    },

    typescript: true,

    unocss: true,

    vue: true,
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
