import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  unocss: true,
  vue: true,
}, {
  rules: {
    'no-undef': 'off', // Nuxt auto-imports cause this to trigger
  },
})
