export default {
  create(context) {
    const functionStack = []

    // Skip server files
    const filename = context.getFilename()
    if (filename.includes('/server/')) {
      return {}
    }

    function isInsideUseAsyncData() {
      // Check if we're inside a useAsyncData call
      for (let i = functionStack.length - 1; i >= 0; i--) {
        const node = functionStack[i]
        if (node.parent
          && node.parent.type === 'CallExpression'
          && node.parent.callee.type === 'Identifier'
          && node.parent.callee.name === 'useAsyncData') {
          return true
        }
      }
      return false
    }

    return {
      // Track function entry
      ':function': function (node) {
        functionStack.push(node)
      },
      // Track function exit
      ':function:exit': function () {
        functionStack.pop()
      },
      // Check queryCollection calls
      CallExpression(node) {
        if (
          node.callee.type === 'Identifier'
          && node.callee.name === 'queryCollection'
          && !isInsideUseAsyncData()
          // Skip if it has an event parameter (server context)
          && !(node.arguments.length > 0 && node.arguments[0].name === 'event')
        ) {
          context.report({
            messageId: 'queryCollectionOutsideAsyncData',
            node,
          })
        }
      },
    }
  },
  meta: {
    docs: {
      description: 'Enforce queryCollection() to be called only inside useAsyncData()',
      recommended: true,
    },
    messages: {
      queryCollectionOutsideAsyncData: 'Call queryCollection() only inside useAsyncData().',
    },
    schema: [],
    type: 'problem',
  },
}
