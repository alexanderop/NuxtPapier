export interface SearchResult {
  id: string
  title: string
  path: string
  category: string
}

export function useSearch() {
  // State
  const query = ref('')
  const loading = ref(false)
  const error = ref<Error | null>(null)

  // Hardcoded results for now - will be replaced with Nuxt Content query
  const items: SearchResult[] = [
    {
      id: '1',
      title: 'Integrating Long-Term Memory with Gemini 2.5',
      path: '/blog/integrating-long-term-memory-gemini',
      category: 'Blog',
    },
    {
      id: '2',
      title: 'The New Skill in AI is Not Prompting, It\'s Context Engineering',
      path: '/blog/context-engineering',
      category: 'Blog',
    },
    {
      id: '3',
      title: 'Single vs Multi-Agent System?',
      path: '/blog/single-vs-multi-agent',
      category: 'Blog',
    },
    {
      id: '4',
      title: 'Zero to One: Learning Agentic Patterns',
      path: '/blog/agentic-patterns',
      category: 'Blog',
    },
    {
      id: '5',
      title: 'Google Gemini LangChain Cheatsheet',
      path: '/blog/gemini-langchain-cheatsheet',
      category: 'Blog',
    },
    {
      id: '6',
      title: 'OpenAI Codex CLI, how does it work?',
      path: '/blog/openai-codex-cli',
      category: 'Blog',
    },
  ]

  // Computed
  const results = computed(() => {
    if (!query.value)
      return items

    const q = query.value.toLowerCase()
    return items.filter(item =>
      item.title.toLowerCase().includes(q),
    )
  })

  // Methods
  function search(q: string) {
    query.value = q
    error.value = null
  }

  function clear() {
    query.value = ''
    error.value = null
  }

  // TODO: Replace with real search using Nuxt Content
  // async function search(q: string) {
  //   loading.value = true
  //   error.value = null
  //
  //   const { data } = await queryCollection('blog')
  //     .where('title', { $contains: q })
  //     .or('description', { $contains: q })
  //     .limit(10)
  //     .find()
  //
  //   loading.value = false
  // }

  // Return readonly state and methods
  return {
    // State
    query: readonly(query),
    results: readonly(results),
    loading: readonly(loading),
    error: readonly(error),

    // Methods
    search,
    clear,
  }
}
