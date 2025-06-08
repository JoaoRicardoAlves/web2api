import { type NextRequest, NextResponse } from "next/server"
import { mockUserOperations } from "@/lib/mock-data"
import { validateUser } from "@/lib/validation"
import type { CreateUserRequest, ApiResponse, User } from "@/lib/types"

/**
 * GET /api/users
 * Retrieve all users
 *
 * @returns {ApiResponse<User[]>} List of all users
 */
export async function GET(): Promise<NextResponse<ApiResponse<User[]>>> {
  try {
    const users = mockUserOperations.findAll()

    return NextResponse.json({
      success: true,
      data: users,
      message: "Usuários recuperados com sucesso",
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
 * POST /api/users
 * Create a new user
 *
 * @param {CreateUserRequest} request.body - User data
 * @returns {ApiResponse<User>} Created user data
 */
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<User>>> {
  try {
    const body: CreateUserRequest = await request.json()

    // Validate input
    const validationErrors = validateUser(body)
    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: validationErrors.join(", "),
        },
        { status: 400 },
      )
    }

    // Check if user already exists
    const existingUser = mockUserOperations.findByEmail(body.email)
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: "Usuário com este email já existe",
        },
        { status: 409 },
      )
    }

    // Create user
    const newUser = mockUserOperations.create({
      name: body.name.trim(),
      email: body.email.toLowerCase().trim(),
      password: body.password || "defaultpassword",
    })

    return NextResponse.json(
      {
        success: true,
        data: newUser,
        message: "Usuário criado com sucesso",
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
