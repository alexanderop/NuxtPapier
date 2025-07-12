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

export interface BlogPost {
  _path: string
  title: string
  description?: string
  date: string
  updatedAt?: string
  author?: string
  tags?: string[]
  image?: string
  ogImage?: string
  draft?: boolean
}
