import antfu from '@antfu/eslint-config'
import sortKeysFixPlugin from 'eslint-plugin-sort-keys-fix'
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility'
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
      'dot-notation': 'off',
      'max-params': 'off',
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
      'vue/block-order': ['error', {
        order: ['script', 'template', 'style'],
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
      'vue/first-attribute-linebreak': ['error', {
        multiline: 'below',
        singleline: 'beside',
      }],
      'vue/html-button-has-type': 'error',
      'vue/html-comment-content-spacing': ['error', 'always'],
      'vue/max-attributes-per-line': ['error', {
        multiline: { max: 1 },
        singleline: { max: 1 },
      }],
      'vue/max-template-depth': ['error', { maxDepth: 7 }],
      'vue/new-line-between-multi-line-property': ['error', {
        minLineOfMultilineProperty: 2,
      }],
      'vue/no-mutating-props': 'error',
      'vue/no-ref-object-reactivity-loss': 'error',
      'vue/no-required-prop-with-default': ['error', {
        autofix: false,
      }],
      'vue/no-unused-emit-declarations': 'error',
      'vue/no-unused-properties': ['error', {
        deepData: true,
        groups: ['props', 'data', 'computed', 'methods', 'setup'],
      }],
      'vue/no-unused-vars': 'error',
      'vue/no-use-v-else-with-v-for': 'error',
      'vue/padding-line-between-tags': ['error', [{
        blankLine: 'always',
        next: '*',
        prev: '*',
      }]],
      'vue/prefer-define-options': 'error',
      'vue/prefer-true-attribute-shorthand': 'error',
      'vue/prefer-use-template-ref': 'error',
      'vue/require-prop-comment': 'error',
      'vue/require-typed-ref': 'error',
      'vue/singleline-html-element-content-newline': ['error', {
        ignoreWhenEmpty: true,
        ignoreWhenNoAttributes: true,
      }],
      'vue/sort-keys': 'off',
      'vue/v-for-delimiter-style': ['error', 'in'],
      'vue35/no-with-defaults': 'error',
      'vue35/query-collection-in-async-data': 'error',
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
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'ts/dot-notation': ['error', {
        allowIndexSignaturePropertyAccess: false,
        allowPrivateClassPropertyAccess: false,
        allowProtectedClassPropertyAccess: false,
      }],
      'ts/max-params': ['error', { max: 3 }],
      'ts/naming-convention': [
        'error',
        // Default: strictCamelCase for everything unless specified otherwise
        {
          format: ['strictCamelCase'],
          leadingUnderscore: 'forbid',
          selector: 'default',
          trailingUnderscore: 'forbid',
        },
        // Imports: Allow PascalCase for components/types, camelCase for everything else
        {
          format: ['camelCase', 'PascalCase'],
          selector: 'import',
        },
        // Variables: camelCase (less strict to allow for prefixes)
        {
          format: ['camelCase'],
          leadingUnderscore: 'forbid',
          selector: 'variable',
          trailingUnderscore: 'forbid',
        },
        // Const variables at module level (global) that look like constants must be UPPER_CASE
        {
          filter: {
            match: true,
            regex: '^[A-Z][A-Z0-9_]*$',
          },
          format: ['UPPER_CASE'],
          modifiers: ['const', 'global'],
          selector: 'variable',
        },
        // Exported const variables that look like constants must be UPPER_CASE
        {
          filter: {
            match: true,
            regex: '^[A-Z][A-Z0-9_]*$',
          },
          format: ['UPPER_CASE'],
          modifiers: ['const', 'exported'],
          selector: 'variable',
        },
        // Variables that start with boolean prefixes should follow proper format
        {
          filter: {
            match: true,
            regex: '^(is|has|can|should|will|did|was|are|were)[A-Z]',
          },
          format: ['camelCase'],
          selector: 'variable',
        },
        // Functions: Strict camelCase
        {
          format: ['strictCamelCase'],
          selector: 'function',
        },
        // Vue/Nuxt specific: Composables must start with 'use'
        {
          filter: {
            match: true,
            regex: '^use',
          },
          format: ['camelCase'],
          selector: 'function',
        },
        // Function/method names should start with a verb (but not enforced)
        {
          custom: {
            match: true,
            regex: '^(get|set|is|has|can|should|will|did|was|are|were|fetch|load|save|delete|remove|add|update|create|build|make|generate|render|handle|process|validate|check|verify|calculate|compute|transform|convert|parse|format|init|setup|cleanup|destroy|toggle|show|hide|open|close|start|stop|begin|end|enable|disable|connect|disconnect|send|receive|emit|trigger|fire|dispatch|execute|run|call|invoke|use|scroll|go|navigate|debounce|throttle|clear|reset|restore|apply|mount|unmount|subscribe|unsubscribe|observe|watch|test|query|find|filter|map|reduce|sort|push|pop|shift|unshift|splice|slice|join|split|replace|match|search|write|read|list|count|sum|average|min|max|group|merge|combine|extract|inject|wrap|unwrap|bind|unbind|attach|detach|focus|blur|hover|click|submit|abort|cancel|retry|wait|delay|pause|resume|play|skip|seek).*',
          },
          format: ['strictCamelCase'],
          selector: ['function', 'method'],
        },
        // Event handlers must start with 'on' or 'handle'
        {
          filter: {
            match: true,
            regex: '^(on|handle)[A-Z]',
          },
          format: ['strictCamelCase'],
          selector: ['function', 'method'],
        },
        // Classes, Interfaces, Types, Enums: Strict PascalCase
        {
          format: ['StrictPascalCase'],
          selector: 'typeLike',
        },
        // Interfaces can optionally start with 'I'
        {
          format: ['StrictPascalCase'],
          selector: 'interface',
        },
        // Type aliases should be descriptive
        {
          format: ['StrictPascalCase'],
          selector: 'typeAlias',
        },
        // Type parameters must be descriptive or prefixed with T
        {
          filter: {
            match: false,
            regex: '^[A-Z]$',
          },
          format: ['PascalCase'],
          prefix: ['T'],
          selector: 'typeParameter',
        },
        // Single letter type parameters are allowed
        {
          filter: {
            match: true,
            regex: '^[A-Z]$',
          },
          format: null,
          selector: 'typeParameter',
        },
        // Enum members: UPPER_CASE only
        {
          format: ['UPPER_CASE'],
          selector: 'enumMember',
        },
        // Parameters: strictCamelCase, underscore only for unused
        {
          format: ['strictCamelCase'],
          leadingUnderscore: 'allow',
          selector: 'parameter',
        },
        // Unused parameters MUST have underscore
        {
          format: ['strictCamelCase'],
          leadingUnderscore: 'require',
          modifiers: ['unused'],
          selector: 'parameter',
        },
        // Private properties/methods must have underscore prefix
        {
          format: ['strictCamelCase'],
          leadingUnderscore: 'require',
          modifiers: ['private'],
          selector: ['property', 'method', 'accessor'],
        },
        // Protected properties/methods must have underscore prefix
        {
          format: ['strictCamelCase'],
          leadingUnderscore: 'require',
          modifiers: ['protected'],
          selector: ['property', 'method', 'accessor'],
        },
        // Object literal properties: strictCamelCase
        {
          format: ['strictCamelCase'],
          selector: ['objectLiteralProperty', 'objectLiteralMethod'],
        },
        // Properties that require quotes: no format enforcement
        {
          format: null,
          modifiers: ['requiresQuotes'],
          selector: ['property', 'method'],
        },
        // Properties with special characters: no format enforcement
        {
          filter: {
            match: true,
            regex: '[-_.,:/ @]|[A-Z]{2,}',
          },
          format: null,
          selector: ['objectLiteralProperty', 'objectLiteralMethod', 'typeProperty'],
        },
        // Destructured variables: keep original names
        {
          format: null,
          modifiers: ['destructured'],
          selector: 'variable',
        },
        // Allow baseURL specifically (common in configs)
        {
          filter: {
            match: true,
            regex: '^(baseURL|baseUrl)$',
          },
          format: null,
          selector: ['objectLiteralProperty', 'typeProperty'],
        },
        // Readonly/const object properties can be UPPER_CASE
        {
          format: ['UPPER_CASE', 'strictCamelCase'],
          modifiers: ['readonly'],
          selector: 'typeProperty',
        },
        // Static readonly class properties should be UPPER_CASE
        {
          format: ['UPPER_CASE'],
          modifiers: ['static', 'readonly'],
          selector: 'property',
        },
        // Allow leading underscore for private-like module variables
        {
          format: ['strictCamelCase'],
          leadingUnderscore: 'allow',
          modifiers: ['const'],
          selector: 'variable',
        },
      ],
      'ts/no-floating-promises': 'error',
      'ts/prefer-optional-chain': 'error',
    },
  },
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
    },
  },
  {
    ignores: ['**/*.md'],
  },
)
