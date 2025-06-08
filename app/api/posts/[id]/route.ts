import { type NextRequest, NextResponse } from "next/server"
import { mockPostOperations, mockUserOperations } from "@/lib/mock-data"
import { validatePost } from "@/lib/validation"
import type { UpdatePostRequest, ApiResponse, Post } from "@/lib/types"

/**
 * GET /api/posts/[id]
 * Retrieve a specific post by ID
 *
 * @param {string} params.id - Post ID
 * @returns {ApiResponse<Post>} Post data
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<ApiResponse<Post>>> {
  try {
    const postId = Number.parseInt(params.id)

    if (isNaN(postId)) {
      return NextResponse.json(
        {
          success: false,
          error: "ID do post deve ser um número válido",
        },
        { status: 400 },
      )
    }

    const post = mockPostOperations.findById(postId)

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          error: "Post não encontrado",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: post,
      message: "Post recuperado com sucesso",
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
 * PUT /api/posts/[id]
 * Update a specific post
 *
 * @param {string} params.id - Post ID
 * @param {UpdatePostRequest} request.body - Updated post data
 * @returns {ApiResponse<Post>} Updated post data
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<ApiResponse<Post>>> {
  try {
    const postId = Number.parseInt(params.id)

    if (isNaN(postId)) {
      return NextResponse.json(
        {
          success: false,
          error: "ID do post deve ser um número válido",
        },
        { status: 400 },
      )
    }

    const body: UpdatePostRequest = await request.json()

    // Validate input if provided
    const fieldsToValidate: any = {}
    if (body.title !== undefined) fieldsToValidate.title = body.title
    if (body.content !== undefined) fieldsToValidate.content = body.content
    if (body.authorId !== undefined) fieldsToValidate.authorId = body.authorId

    if (Object.keys(fieldsToValidate).length > 0) {
      // Add required fields for validation if not provided
      if (!fieldsToValidate.title) fieldsToValidate.title = "valid"
      if (!fieldsToValidate.content) fieldsToValidate.content = "valid"
      if (!fieldsToValidate.authorId) fieldsToValidate.authorId = 1

      const validationErrors = validatePost(fieldsToValidate)

      if (body.title && validationErrors.some((e) => e.includes("Título"))) {
        return NextResponse.json(
          {
            success: false,
            error: "Título é obrigatório",
          },
          { status: 400 },
        )
      }

      if (body.content && validationErrors.some((e) => e.includes("Conteúdo"))) {
        return NextResponse.json(
          {
            success: false,
            error: "Conteúdo é obrigatório",
          },
          { status: 400 },
        )
      }
    }

    // Check if post exists
    const existingPost = mockPostOperations.findById(postId)
    if (!existingPost) {
      return NextResponse.json(
        {
          success: false,
          error: "Post não encontrado",
        },
        { status: 404 },
      )
    }

    // Check if new author exists (if authorId is being updated)
    if (body.authorId && body.authorId !== existingPost.authorId) {
      const author = mockUserOperations.findById(body.authorId)
      if (!author) {
        return NextResponse.json(
          {
            success: false,
            error: "Novo autor não encontrado",
          },
          { status: 404 },
        )
      }
    }

    // Update post
    const updatedPost = mockPostOperations.update(postId, {
      ...(body.title && { title: body.title.trim() }),
      ...(body.content && { content: body.content.trim() }),
      ...(body.authorId && { authorId: body.authorId }),
      ...(body.published !== undefined && { published: body.published }),
    })

    return NextResponse.json({
      success: true,
      data: updatedPost!,
      message: "Post atualizado com sucesso",
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
 * DELETE /api/posts/[id]
 * Delete a specific post
 *
 * @param {string} params.id - Post ID
 * @returns {ApiResponse<null>} Deletion confirmation
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<ApiResponse<null>>> {
  try {
    const postId = Number.parseInt(params.id)

    if (isNaN(postId)) {
      return NextResponse.json(
        {
          success: false,
          error: "ID do post deve ser um número válido",
        },
        { status: 400 },
      )
    }

    const deleted = mockPostOperations.delete(postId)

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          error: "Post não encontrado",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: null,
      message: "Post deletado com sucesso",
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
