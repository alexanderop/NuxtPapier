import antfu from '@antfu/eslint-config'
import sortKeysFixPlugin from 'eslint-plugin-sort-keys-fix'
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility'
// NOTE: eslint-plugin-neverthrow has compatibility issues with ESLint 9 flat config
// Until this is resolved, manually ensure all neverthrow Result types are handled:
// - Always call .isOk() or .isErr() to check the result
// - Use .match(), .map(), .mapErr(), or .andThen() to handle results
// - Never ignore returned Result types from neverthrow functions
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
      'no-restricted-imports': ['error', {
        paths: [
          {
            message: 'Use auto-imports instead of importing from vue. Vue composables are automatically available in Nuxt.',
            name: 'vue',
          },
          {
            message: 'Use auto-imports instead of importing from #app. Nuxt composables are automatically available.',
            name: '#app',
          },
          {
            message: 'Use auto-imports instead of importing from #imports. Composables are automatically available.',
            name: '#imports',
          },
          {
            message: 'Use auto-imports instead of importing from nuxt/app. Nuxt composables are automatically available.',
            name: 'nuxt/app',
          },
          {
            message: 'Use auto-imports instead of importing from @vueuse/core. VueUse composables are automatically available via @vueuse/nuxt.',
            name: '@vueuse/core',
          },
          {
            message: 'Use auto-imports instead of importing from @nuxt/schema. Nuxt types are automatically available.',
            name: '@nuxt/schema',
          },
        ],
        patterns: [
          {
            group: ['~/utils/*', '~/utils/**'],
            message: 'Use auto-imports instead of importing from ~/utils/*. Utilities are automatically available in Nuxt.',
          },
          {
            group: ['~/composables/*', '~/composables/**'],
            message: 'Use auto-imports instead of importing from ~/composables/*. Composables are automatically available in Nuxt.',
          },
          {
            group: ['~/components/*', '~/components/**'],
            message: 'Use auto-imports instead of importing from ~/components/*. Components are automatically available in Nuxt.',
          },
          {
            group: ['~/server/utils/*', '~/server/utils/**'],
            message: 'Use auto-imports instead of importing from ~/server/utils/*. Server utilities are automatically available in Nuxt.',
          },
        ],
      }],
      'no-restricted-syntax': ['error', {
        message: 'Use ref() instead of reactive() for better performance and type safety.',
        selector: 'CallExpression[callee.name="reactive"]',
      }],
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
      'ts/consistent-type-assertions': ['error', {
        assertionStyle: 'never',
      }],
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
      'vue/max-template-depth': ['error', { maxDepth: 7 }],
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
      'vue/prefer-use-template-ref': 'error',
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

    typescript: {
      tsconfigPath: 'tsconfig.json',
    },

    unocss: true,

    vue: true,
  },
  ...pluginVueA11y.configs['flat/recommended'],
  {
    files: ['pages/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    files: ['server/**/*.ts'],
    rules: {
      'ts/ban-ts-comment': 'off',
      'ts/no-unsafe-argument': 'off',
      'ts/no-unsafe-assignment': 'off',
      'ts/no-unsafe-call': 'off',
      'ts/no-unsafe-member-access': 'off',
      'ts/no-unsafe-return': 'off',
    },
  },
  {
    files: ['composables/**/*.ts'],
    rules: {
      'ts/no-unsafe-member-access': 'off',
    },
  },
  {
    files: ['app/**/*.ts'],
    rules: {
      'no-void': 'off',
      'require-await': 'off',
      'ts/no-floating-promises': 'off',
    },
  },
  {
    ignores: ['**/*.md'],
  },
)
