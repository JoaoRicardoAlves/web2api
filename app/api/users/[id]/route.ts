import { type NextRequest, NextResponse } from "next/server"
import { mockUserOperations } from "@/lib/mock-data"
import { validateUser } from "@/lib/validation"
import type { UpdateUserRequest, ApiResponse, User } from "@/lib/types"

/**
 * GET /api/users/[id]
 * Retrieve a specific user by ID
 *
 * @param {string} params.id - User ID
 * @returns {ApiResponse<User>} User data
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<ApiResponse<User>>> {
  try {
    const userId = Number.parseInt(params.id)

    if (isNaN(userId)) {
      return NextResponse.json(
        {
          success: false,
          error: "ID do usuário deve ser um número válido",
        },
        { status: 400 },
      )
    }

    const user = mockUserOperations.findById(userId)

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Usuário não encontrado",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: user,
      message: "Usuário recuperado com sucesso",
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
 * PUT /api/users/[id]
 * Update a specific user
 *
 * @param {string} params.id - User ID
 * @param {UpdateUserRequest} request.body - Updated user data
 * @returns {ApiResponse<User>} Updated user data
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<ApiResponse<User>>> {
  try {
    const userId = Number.parseInt(params.id)

    if (isNaN(userId)) {
      return NextResponse.json(
        {
          success: false,
          error: "ID do usuário deve ser um número válido",
        },
        { status: 400 },
      )
    }

    const body: UpdateUserRequest = await request.json()

    // Validate input if provided
    if (body.name !== undefined || body.email !== undefined) {
      const validationErrors = validateUser({
        name: body.name || "valid",
        email: body.email || "valid@email.com",
      })

      if (body.name && validationErrors.some((e) => e.includes("Nome"))) {
        return NextResponse.json(
          {
            success: false,
            error: "Nome deve ter pelo menos 2 caracteres",
          },
          { status: 400 },
        )
      }

      if (body.email && validationErrors.some((e) => e.includes("Email"))) {
        return NextResponse.json(
          {
            success: false,
            error: "Email deve ter um formato válido",
          },
          { status: 400 },
        )
      }
    }

    // Check if user exists
    const existingUser = mockUserOperations.findById(userId)
    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: "Usuário não encontrado",
        },
        { status: 404 },
      )
    }

    // Check email uniqueness if email is being updated
    if (body.email && body.email !== existingUser.email) {
      const userWithEmail = mockUserOperations.findByEmail(body.email)
      if (userWithEmail) {
        return NextResponse.json(
          {
            success: false,
            error: "Email já está em uso por outro usuário",
          },
          { status: 409 },
        )
      }
    }

    // Update user
    const updatedUser = mockUserOperations.update(userId, {
      ...(body.name && { name: body.name.trim() }),
      ...(body.email && { email: body.email.toLowerCase().trim() }),
      ...(body.password && { password: body.password }),
    })

    return NextResponse.json({
      success: true,
      data: updatedUser!,
      message: "Usuário atualizado com sucesso",
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
 * DELETE /api/users/[id]
 * Delete a specific user
 *
 * @param {string} params.id - User ID
 * @returns {ApiResponse<null>} Deletion confirmation
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<ApiResponse<null>>> {
  try {
    const userId = Number.parseInt(params.id)

    if (isNaN(userId)) {
      return NextResponse.json(
        {
          success: false,
          error: "ID do usuário deve ser um número válido",
        },
        { status: 400 },
      )
    }

    const deleted = mockUserOperations.delete(userId)

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          error: "Usuário não encontrado",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: null,
      message: "Usuário deletado com sucesso",
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
