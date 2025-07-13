import noWithDefaults from './rules/no-with-defaults.js'

export default {
  configs: {
    recommended: {
      rules: {
        'vue35/no-with-defaults': 'error',
      },
    },
  },
  rules: {
    'no-with-defaults': noWithDefaults,
  },
}
