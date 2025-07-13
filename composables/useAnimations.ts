export function useAnimations() {
  const appConfig = useAppConfig()
  const enabled = computed(() => appConfig.site.animations)

  const transitionClasses = computed(() =>
    (enabled.value
      ? 'transition-all duration-300 ease-in-out'
      : ''),
  )

  const fadeInClasses = computed(() =>
    (enabled.value
      ? 'opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]'
      : ''),
  )

  const slideUpClasses = computed(() =>
    (enabled.value
      ? 'opacity-0 translate-y-5 animate-[slideUp_0.5s_ease-in-out_forwards]'
      : ''),
  )

  return {
    enabled: readonly(enabled),
    fadeInClasses,
    slideUpClasses,
    transitionClasses,
  }
}
