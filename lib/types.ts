export interface PortfolioItem {
  id: string
  title: string
  description: string
  imageUrl: string
  projectUrl?: string
  category: string
  technologies?: string
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Publication {
  id: string
  title: string
  description: string
  content: string
  imageUrl?: string
  link?: string
  publicationDate?: string
  publishedAt: Date
  createdAt: Date
  updatedAt: Date
}

export interface Message {
  id: string
  name: string
  email: string
  message: string
  read: boolean
  createdAt: Date
}

export interface AdminUser {
  id: string
  email: string
  passwordHash: string
  createdAt: Date
  updatedAt: Date
}
