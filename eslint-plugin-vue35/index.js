import noWithDefaults from './rules/no-with-defaults.js'

export default {
  rules: {
    'no-with-defaults': noWithDefaults,
  },
  configs: {
    recommended: {
      rules: {
        'vue35/no-with-defaults': 'error',
      },
    },
  },
}
