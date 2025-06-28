import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  unocss: true,
  vue: true,
  typescript: true,
  markdown: true,
}, {
  ignores: [
    '.claude/**/*',
  ],
}, {
  rules: {
    'no-undef': 'off', // Nuxt auto-imports cause this to trigger
  },
}, {
  files: ['**/*.md/*.js', '**/*.md/*.ts', '**/*.md/*.vue'],
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'no-irregular-whitespace': 'off',
    'style/max-len': 'off',
  },
})
