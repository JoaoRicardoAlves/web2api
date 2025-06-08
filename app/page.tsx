import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, FileText, Code, Database } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">RESTful API - Users & Posts</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Uma API completa para gerenciamento de usuários e posts, construída com Next.js, TypeScript e Prisma ORM
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Users className="w-12 h-12 mx-auto text-blue-600 mb-2" />
              <CardTitle>Usuários</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Gerenciamento completo de usuários com CRUD operations</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <FileText className="w-12 h-12 mx-auto text-green-600 mb-2" />
              <CardTitle>Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Sistema de posts com relacionamentos e validações</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Code className="w-12 h-12 mx-auto text-purple-600 mb-2" />
              <CardTitle>TypeScript</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Tipagem forte e validações robustas</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Database className="w-12 h-12 mx-auto text-orange-600 mb-2" />
              <CardTitle>Prisma ORM</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Modelagem de dados moderna e type-safe</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Endpoints de Usuários
              </CardTitle>
              <CardDescription>Operações CRUD para gerenciamento de usuários</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-mono text-sm">GET /api/users</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Listar</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-mono text-sm">POST /api/users</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Criar</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-mono text-sm">PUT /api/users/:id</span>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Atualizar</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-mono text-sm">DELETE /api/users/:id</span>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Deletar</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Endpoints de Posts
              </CardTitle>
              <CardDescription>Operações CRUD para gerenciamento de posts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-mono text-sm">GET /api/posts</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Listar</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-mono text-sm">POST /api/posts</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Criar</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-mono text-sm">GET /api/posts/:id</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Buscar</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-mono text-sm">PUT /api/posts/:id</span>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Atualizar</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-mono text-sm">DELETE /api/posts/:id</span>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Deletar</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Link href="/docs">
            <Button size="lg" className="mr-4">
              Ver Documentação Completa
            </Button>
          </Link>
          <Link href="/test">
            <Button variant="outline" size="lg">
              Testar API
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
