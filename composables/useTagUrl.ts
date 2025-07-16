export function useTagUrl(tag: MaybeRefOrGetter<string>) {
  return computed(() => {
    const tagValue = toValue(tag)
    // Manually encode the tag to handle all special characters properly
    const encodedTag = encodeURIComponent(tagValue)

    return `/tags/${encodedTag}`
  })
}

export function useTagFromRoute(encodedTag: string) {
  // Decode the tag from the route parameter
  return decodeURIComponent(encodedTag)
}
