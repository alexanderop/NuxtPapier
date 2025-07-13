// ~/types/index.d.ts   ← Nuxt auto-includes any .d.ts in the project root or /types

export interface Site {
  website?: string
  author: string
  desc: string
  title: string
  ogImage?: string
  lightAndDarkMode: boolean
  postPerIndex: number
  postPerPage: number
  showBackButton: boolean
  showArchives: boolean
  dynamicOgImage: boolean
  dir: 'ltr' | 'rtl' | 'auto'
  lang: string
  timezone: string
  animations: boolean
}

export interface Metadata {
  title: string
  description: string
  ogImage?: string
}

export interface Social {
  name: string
  href: string
  linkTitle: string
  icon: string
}

export type Socials = Social[]

export interface SeoMetaData {
  title?: string
  description?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogImageWidth?: number
  ogImageHeight?: number
  ogImageAlt?: string
  ogUrl?: string
  ogType?: 'article' | 'website' | 'book' | 'profile' | 'music.song' | 'music.album' | 'music.playlist' | 'music.radio_status' | 'video.movie' | 'video.episode' | 'video.tv_show' | 'video.other'
  ogSiteName?: string
  ogLocale?: string
  twitterCard?: 'summary' | 'app' | 'summary_large_image' | 'player'
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  twitterImageAlt?: string
  twitterSite?: string
  author?: string
  canonical?: string
  articleAuthor?: string[]
  articlePublishedTime?: string
  articleModifiedTime?: string
  articleTag?: string[]
  articleSection?: string
}
