import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Documentação da API</h1>
            <p className="text-gray-600">
              Documentação completa dos endpoints da API para gerenciamento de usuários e posts
            </p>
          </div>

          {/* Users Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Usuários</CardTitle>
              <CardDescription>Endpoints para gerenciamento de usuários</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* GET /api/users */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">GET</Badge>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">/api/users</code>
                </div>
                <p className="text-sm text-gray-600 mb-2">Recupera todos os usuários</p>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  <strong>Resposta (200):</strong>
                  <pre className="mt-1 text-xs">{`{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "João Silva",
      "email": "joao@exemplo.com",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "message": "Usuários recuperados com sucesso"
}`}</pre>
                </div>
              </div>

              <Separator />

              {/* POST /api/users */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="default">POST</Badge>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">/api/users</code>
                </div>
                <p className="text-sm text-gray-600 mb-2">Cria um novo usuário</p>
                <div className="bg-gray-50 p-3 rounded text-sm mb-2">
                  <strong>Body:</strong>
                  <pre className="mt-1 text-xs">{`{
  "name": "Nome do usuário",
  "email": "email@exemplo.com",
  "password": "senha123" // opcional
}`}</pre>
                </div>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  <strong>Resposta (201):</strong>
                  <pre className="mt-1 text-xs">{`{
  "success": true,
  "data": {
    "id": 3,
    "name": "Nome do usuário",
    "email": "email@exemplo.com",
    "createdAt": "2024-01-03T00:00:00.000Z",
    "updatedAt": "2024-01-03T00:00:00.000Z"
  },
  "message": "Usuário criado com sucesso"
}`}</pre>
                </div>
              </div>

              <Separator />

              {/* PUT /api/users/[id] */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">PUT</Badge>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">/api/users/:id</code>
                </div>
                <p className="text-sm text-gray-600 mb-2">Atualiza um usuário específico</p>
                <div className="bg-gray-50 p-3 rounded text-sm mb-2">
                  <strong>Parâmetros:</strong>
                  <ul className="mt-1 text-xs list-disc list-inside">
                    <li>
                      <code>id</code> - ID do usuário (número)
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  <strong>Body (campos opcionais):</strong>
                  <pre className="mt-1 text-xs">{`{
  "name": "Novo nome",
  "email": "novo@email.com",
  "password": "novasenha123"
}`}</pre>
                </div>
              </div>

              <Separator />

              {/* DELETE /api/users/[id] */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="destructive">DELETE</Badge>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">/api/users/:id</code>
                </div>
                <p className="text-sm text-gray-600 mb-2">Remove um usuário específico</p>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  <strong>Resposta (200):</strong>
                  <pre className="mt-1 text-xs">{`{
  "success": true,
  "data": null,
  "message": "Usuário deletado com sucesso"
}`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Posts</CardTitle>
              <CardDescription>Endpoints para gerenciamento de posts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* GET /api/posts */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">GET</Badge>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">/api/posts</code>
                </div>
                <p className="text-sm text-gray-600 mb-2">Recupera todos os posts</p>
                <div className="bg-gray-50 p-3 rounded text-sm mb-2">
                  <strong>Query Parameters (opcionais):</strong>
                  <ul className="mt-1 text-xs list-disc list-inside">
                    <li>
                      <code>authorId</code> - Filtrar por ID do autor
                    </li>
                    <li>
                      <code>published</code> - Filtrar por status de publicação (true/false)
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  <strong>Resposta (200):</strong>
                  <pre className="mt-1 text-xs">{`{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Primeiro Post",
      "content": "Este é o conteúdo do primeiro post.",
      "published": true,
      "authorId": 1,
      "author": {
        "id": 1,
        "name": "João Silva",
        "email": "joao@exemplo.com"
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "message": "Posts recuperados com sucesso"
}`}</pre>
                </div>
              </div>

              <Separator />

              {/* POST /api/posts */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="default">POST</Badge>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">/api/posts</code>
                </div>
                <p className="text-sm text-gray-600 mb-2">Cria um novo post</p>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  <strong>Body:</strong>
                  <pre className="mt-1 text-xs">{`{
  "title": "Título do Post",
  "content": "Conteúdo do post",
  "authorId": 1,
  "published": false // opcional, padrão: false
}`}</pre>
                </div>
              </div>

              <Separator />

              {/* GET /api/posts/[id] */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">GET</Badge>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">/api/posts/:id</code>
                </div>
                <p className="text-sm text-gray-600 mb-2">Recupera um post específico</p>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  <strong>Parâmetros:</strong>
                  <ul className="mt-1 text-xs list-disc list-inside">
                    <li>
                      <code>id</code> - ID do post (número)
                    </li>
                  </ul>
                </div>
              </div>

              <Separator />

              {/* PUT /api/posts/[id] */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">PUT</Badge>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">/api/posts/:id</code>
                </div>
                <p className="text-sm text-gray-600 mb-2">Atualiza um post específico</p>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  <strong>Body (campos opcionais):</strong>
                  <pre className="mt-1 text-xs">{`{
  "title": "Novo título",
  "content": "Novo conteúdo",
  "authorId": 1,
  "published": true
}`}</pre>
                </div>
              </div>

              <Separator />

              {/* DELETE /api/posts/[id] */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="destructive">DELETE</Badge>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">/api/posts/:id</code>
                </div>
                <p className="text-sm text-gray-600 mb-2">Remove um post específico</p>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  <strong>Resposta (200):</strong>
                  <pre className="mt-1 text-xs">{`{
  "success": true,
  "data": null,
  "message": "Post deletado com sucesso"
}`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Authentication Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Autenticação</CardTitle>
              <CardDescription>Endpoint para autenticação de usuários</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="default">POST</Badge>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">/api/auth/login</code>
                </div>
                <p className="text-sm text-gray-600 mb-2">Autentica um usuário</p>
                <div className="bg-gray-50 p-3 rounded text-sm mb-2">
                  <strong>Body:</strong>
                  <pre className="mt-1 text-xs">{`{
  "email": "joao@exemplo.com",
  "password": "senha123"
}`}</pre>
                </div>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  <strong>Resposta (200):</strong>
                  <pre className="mt-1 text-xs">{`{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "João Silva",
      "email": "joao@exemplo.com"
    },
    "token": "mock-jwt-token-1-1234567890"
  },
  "message": "Login realizado com sucesso"
}`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error Handling Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Tratamento de Erros</CardTitle>
              <CardDescription>Códigos de status e mensagens de erro padrão</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-3 rounded">
                  <strong className="text-red-800">400 - Bad Request</strong>
                  <p className="text-sm text-red-600 mt-1">Dados de entrada inválidos ou ausentes</p>
                </div>
                <div className="bg-red-50 p-3 rounded">
                  <strong className="text-red-800">401 - Unauthorized</strong>
                  <p className="text-sm text-red-600 mt-1">Credenciais inválidas</p>
                </div>
                <div className="bg-red-50 p-3 rounded">
                  <strong className="text-red-800">404 - Not Found</strong>
                  <p className="text-sm text-red-600 mt-1">Recurso não encontrado</p>
                </div>
                <div className="bg-red-50 p-3 rounded">
                  <strong className="text-red-800">409 - Conflict</strong>
                  <p className="text-sm text-red-600 mt-1">Conflito de dados (ex: email já existe)</p>
                </div>
                <div className="bg-red-50 p-3 rounded">
                  <strong className="text-red-800">500 - Internal Server Error</strong>
                  <p className="text-sm text-red-600 mt-1">Erro interno do servidor</p>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded text-sm">
                <strong>Formato padrão de erro:</strong>
                <pre className="mt-1 text-xs">{`{
  "success": false,
  "error": "Mensagem de erro descritiva"
}`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
