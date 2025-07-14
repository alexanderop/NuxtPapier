export const tocKey: InjectionKey<{
  withinToc: boolean
  activeId: Readonly<Ref<string>>
  scrollToHeading: (_id: string) => void
  handleClick: (_event: Event, _id: string) => void
  isActive: (_id: string) => boolean
}> = Symbol('tableOfContents')
