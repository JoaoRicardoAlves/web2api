// Mock Data Store (In-memory storage for demonstration)
import type { User, Post } from "./types"

const users: User[] = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@exemplo.com",
    password: "hashedpassword123",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@exemplo.com",
    password: "hashedpassword456",
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02"),
  },
]

let posts: Post[] = [
  {
    id: 1,
    title: "Primeiro Post",
    content: "Este é o conteúdo do primeiro post.",
    published: true,
    authorId: 1,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 2,
    title: "Segundo Post",
    content: "Conteúdo do segundo post com mais detalhes.",
    published: false,
    authorId: 2,
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02"),
  },
]

let nextUserId = 3
let nextPostId = 3

// User operations
export const mockUserOperations = {
  findAll: (): User[] => {
    return users.map((user) => ({ ...user, password: undefined }))
  },

  findById: (id: number): User | null => {
    const user = users.find((u) => u.id === id)
    if (user) {
      const { password, ...userWithoutPassword } = user
      return userWithoutPassword
    }
    return null
  },

  findByEmail: (email: string): User | null => {
    return users.find((u) => u.email === email) || null
  },

  create: (userData: Omit<User, "id" | "createdAt" | "updatedAt">): User => {
    const newUser: User = {
      ...userData,
      id: nextUserId++,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    users.push(newUser)
    const { password, ...userWithoutPassword } = newUser
    return userWithoutPassword
  },

  update: (id: number, userData: Partial<User>): User | null => {
    const userIndex = users.findIndex((u) => u.id === id)
    if (userIndex === -1) return null

    users[userIndex] = {
      ...users[userIndex],
      ...userData,
      updatedAt: new Date(),
    }

    const { password, ...userWithoutPassword } = users[userIndex]
    return userWithoutPassword
  },

  delete: (id: number): boolean => {
    const userIndex = users.findIndex((u) => u.id === id)
    if (userIndex === -1) return false

    users.splice(userIndex, 1)
    // Also delete user's posts
    posts = posts.filter((p) => p.authorId !== id)
    return true
  },
}

// Post operations
export const mockPostOperations = {
  findAll: (): Post[] => {
    return posts.map((post) => ({
      ...post,
      author: users.find((u) => u.id === post.authorId),
    }))
  },

  findById: (id: number): Post | null => {
    const post = posts.find((p) => p.id === id)
    if (post) {
      return {
        ...post,
        author: users.find((u) => u.id === post.authorId),
      }
    }
    return null
  },

  findByAuthorId: (authorId: number): Post[] => {
    return posts
      .filter((p) => p.authorId === authorId)
      .map((post) => ({
        ...post,
        author: users.find((u) => u.id === post.authorId),
      }))
  },

  create: (postData: Omit<Post, "id" | "createdAt" | "updatedAt">): Post => {
    const newPost: Post = {
      ...postData,
      id: nextPostId++,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    posts.push(newPost)
    return {
      ...newPost,
      author: users.find((u) => u.id === newPost.authorId),
    }
  },

  update: (id: number, postData: Partial<Post>): Post | null => {
    const postIndex = posts.findIndex((p) => p.id === id)
    if (postIndex === -1) return null

    posts[postIndex] = {
      ...posts[postIndex],
      ...postData,
      updatedAt: new Date(),
    }

    return {
      ...posts[postIndex],
      author: users.find((u) => u.id === posts[postIndex].authorId),
    }
  },

  delete: (id: number): boolean => {
    const postIndex = posts.findIndex((p) => p.id === id)
    if (postIndex === -1) return false

    posts.splice(postIndex, 1)
    return true
  },
}
