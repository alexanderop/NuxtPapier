export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce using reactive props destructure instead of withDefaults',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: null,
    hasSuggestions: false,
    schema: [],
    messages: {
      usePropsDestructure: 'Use reactive props destructure instead of withDefaults. Vue 3.5+ supports default values in destructured props. Example: const { prop = defaultValue } = defineProps<{ prop?: Type }>()',
    },
  },

  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.name === 'withDefaults'
          && node.arguments.length === 2
          && node.arguments[0].type === 'CallExpression'
          && node.arguments[0].callee.name === 'defineProps'
        ) {
          context.report({
            node,
            messageId: 'usePropsDestructure',
          })
        }
      },
    }
  },
}
