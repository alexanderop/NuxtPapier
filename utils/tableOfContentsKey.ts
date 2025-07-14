export interface TableOfContentsContext {
  activeId: Ref<string>
  scrollToHeading: (_id: string) => void
}

export const tableOfContentsKey = Symbol('tableOfContents') as InjectionKey<TableOfContentsContext>
