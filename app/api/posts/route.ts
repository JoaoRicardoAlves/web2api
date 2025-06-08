import { type NextRequest, NextResponse } from "next/server"
import { mockPostOperations, mockUserOperations } from "@/lib/mock-data"
import { validatePost } from "@/lib/validation"
import type { CreatePostRequest, ApiResponse, Post } from "@/lib/types"

/**
 * GET /api/posts
 * Retrieve all posts
 *
 * @param {string} searchParams.authorId - Filter by author ID (optional)
 * @param {string} searchParams.published - Filter by published status (optional)
 * @returns {ApiResponse<Post[]>} List of posts
 */
export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<Post[]>>> {
  try {
    const { searchParams } = new URL(request.url)
    const authorId = searchParams.get("authorId")
    const published = searchParams.get("published")

    let posts = mockPostOperations.findAll()

    // Filter by author if specified
    if (authorId) {
      const authorIdNum = Number.parseInt(authorId)
      if (!isNaN(authorIdNum)) {
        posts = posts.filter((post) => post.authorId === authorIdNum)
      }
    }

    // Filter by published status if specified
    if (published !== null) {
      const isPublished = published === "true"
      posts = posts.filter((post) => post.published === isPublished)
    }

    return NextResponse.json({
      success: true,
      data: posts,
      message: "Posts recuperados com sucesso",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}

/**
 * POST /api/posts
 * Create a new post
 *
 * @param {CreatePostRequest} request.body - Post data
 * @returns {ApiResponse<Post>} Created post data
 */
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<Post>>> {
  try {
    const body: CreatePostRequest = await request.json()

    // Validate input
    const validationErrors = validatePost(body)
    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: validationErrors.join(", "),
        },
        { status: 400 },
      )
    }

    // Check if author exists
    const author = mockUserOperations.findById(body.authorId)
    if (!author) {
      return NextResponse.json(
        {
          success: false,
          error: "Autor não encontrado",
        },
        { status: 404 },
      )
    }

    // Create post
    const newPost = mockPostOperations.create({
      title: body.title.trim(),
      content: body.content.trim(),
      authorId: body.authorId,
      published: body.published || false,
    })

    return NextResponse.json(
      {
        success: true,
        data: newPost,
        message: "Post criado com sucesso",
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}
