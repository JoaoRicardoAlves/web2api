import { type NextRequest, NextResponse } from "next/server"
import { mockUserOperations } from "@/lib/mock-data"
import type { LoginRequest, ApiResponse } from "@/lib/types"

/**
 * POST /api/auth/login
 * User authentication
 *
 * @param {LoginRequest} request.body - Login credentials
 * @returns {ApiResponse<{user: User, token: string}>} Authentication result
 */
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<{ user: any; token: string }>>> {
  try {
    const body: LoginRequest = await request.json()

    if (!body.email || !body.password) {
      return NextResponse.json(
        {
          success: false,
          error: "Email e senha são obrigatórios",
        },
        { status: 400 },
      )
    }

    // Find user by email
    const user = mockUserOperations.findByEmail(body.email.toLowerCase().trim())

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Credenciais inválidas",
        },
        { status: 401 },
      )
    }

    // In a real application, you would hash and compare passwords
    // For this mock, we'll just check if password exists
    if (!user.password) {
      return NextResponse.json(
        {
          success: false,
          error: "Credenciais inválidas",
        },
        { status: 401 },
      )
    }

    // Generate mock JWT token (in real app, use proper JWT library)
    const mockToken = `mock-jwt-token-${user.id}-${Date.now()}`

    // Remove password from response
    const { password, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token: mockToken,
      },
      message: "Login realizado com sucesso",
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
