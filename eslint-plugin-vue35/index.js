import noWithDefaults from './rules/no-with-defaults.js'
import queryCollectionInAsyncData from './rules/query-collection-in-async-data.js'

export default {
  configs: {
    recommended: {
      rules: {
        'vue35/no-with-defaults': 'error',
        'vue35/query-collection-in-async-data': 'error',
      },
    },
  },
  rules: {
    'no-with-defaults': noWithDefaults,
    'query-collection-in-async-data': queryCollectionInAsyncData,
  },
}
