import { Profile } from './profile'

export interface Article {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: Profile
}

export interface ArticleResponse {
  article: Article
}

export interface ArticlesResponse {
  articles: Article[]
  articlesCount: number
}

export type ListType = 'ALL' | 'FEED'

export interface Filters {
  tag?: Tag
  author?: string
  favorited?: string
  limit?: number
  offset?: number
}

export interface ArticleListConfig {
  type: ListType
  currentPage: number
  filters: Filters
}

export interface Tag {
  tag: string
}

export interface TagsResponse {
  tags: Tag[]
}
