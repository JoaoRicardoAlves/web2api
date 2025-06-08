// Validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateUser = (userData: any): string[] => {
  const errors: string[] = []

  if (!userData.name || typeof userData.name !== "string" || userData.name.trim().length < 2) {
    errors.push("Nome deve ter pelo menos 2 caracteres")
  }

  if (!userData.email || !validateEmail(userData.email)) {
    errors.push("Email deve ter um formato válido")
  }

  return errors
}

export const validatePost = (postData: any): string[] => {
  const errors: string[] = []

  if (!postData.title || typeof postData.title !== "string" || postData.title.trim().length < 1) {
    errors.push("Título é obrigatório")
  }

  if (!postData.content || typeof postData.content !== "string" || postData.content.trim().length < 1) {
    errors.push("Conteúdo é obrigatório")
  }

  if (!postData.authorId || typeof postData.authorId !== "number") {
    errors.push("ID do autor é obrigatório")
  }

  return errors
}
