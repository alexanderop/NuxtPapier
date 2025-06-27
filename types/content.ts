export interface BlogPostAuthor {
  name: string
  url?: string
  avatar?: string
  bio?: string
}

export interface BlogPostImage {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

export interface BlogPost {
  _path: string
  _id: string
  title: string
  description: string
  date: string
  formattedDate?: string
  slug?: string
  excerpt?: string
  tags?: string[]
  category?: string
  categorySlug?: string
  author?: BlogPostAuthor
  image?: BlogPostImage
  readingTime?: number
  status?: 'draft' | 'published' | 'archived'
  createdAt?: string
  updatedAt?: string
  toc?: {
    title?: string
    links: TocLink[]
  }
  body: any
}

export interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

export interface ContentQuery {
  tags?: string[]
  category?: string
  status?: BlogPost['status']
  limit?: number
  skip?: number
  sort?: Record<string, 1 | -1>
}
