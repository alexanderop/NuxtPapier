export default defineNuxtPlugin(() => {
  const appConfig = useAppConfig()
  const runtimeConfig = useRuntimeConfig()

  if (runtimeConfig.public.siteUrl) {
    appConfig.site.website = runtimeConfig.public.siteUrl
  }
})
