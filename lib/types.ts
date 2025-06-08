// Data Models and Types

export interface User {
  id: number
  name: string
  email: string
  password?: string
  createdAt: Date
  updatedAt: Date
  posts?: Post[]
}

export interface Post {
  id: number
  title: string
  content: string
  published: boolean
  authorId: number
  author?: User
  createdAt: Date
  updatedAt: Date
}

// Request/Response Types
export interface CreateUserRequest {
  name: string
  email: string
  password?: string
}

export interface UpdateUserRequest {
  name?: string
  email?: string
  password?: string
}

export interface CreatePostRequest {
  title: string
  content: string
  authorId: number
  published?: boolean
}

export interface UpdatePostRequest {
  title?: string
  content?: string
  authorId?: number
  published?: boolean
}

export interface LoginRequest {
  email: string
  password: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginationParams {
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
