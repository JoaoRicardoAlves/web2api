"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TestPage() {
  const [response, setResponse] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const makeRequest = async (method: string, url: string, body?: any) => {
    setLoading(true)
    try {
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      }

      if (body) {
        options.body = JSON.stringify(body)
      }

      const res = await fetch(url, options)
      const data = await res.json()

      setResponse({
        status: res.status,
        data: data,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      setResponse({
        status: "Error",
        data: { error: "Erro de conexão" },
        timestamp: new Date().toISOString(),
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Teste da API</h1>
            <p className="text-gray-600">Interface para testar os endpoints da API</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Request Panel */}
            <div>
              <Tabs defaultValue="users" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="users">Usuários</TabsTrigger>
                  <TabsTrigger value="posts">Posts</TabsTrigger>
                  <TabsTrigger value="auth">Auth</TabsTrigger>
                </TabsList>

                {/* Users Tab */}
                <TabsContent value="users" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="secondary">GET</Badge>
                        Listar Usuários
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button onClick={() => makeRequest("GET", "/api/users")} disabled={loading} className="w-full">
                        {loading ? "Carregando..." : "GET /api/users"}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="default">POST</Badge>
                        Criar Usuário
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input placeholder="Nome" id="user-name" />
                      <Input placeholder="Email" id="user-email" type="email" />
                      <Input placeholder="Senha (opcional)" id="user-password" type="password" />
                      <Button
                        onClick={() => {
                          const name = (document.getElementById("user-name") as HTMLInputElement).value
                          const email = (document.getElementById("user-email") as HTMLInputElement).value
                          const password = (document.getElementById("user-password") as HTMLInputElement).value

                          if (name && email) {
                            makeRequest("POST", "/api/users", { name, email, password: password || undefined })
                          }
                        }}
                        disabled={loading}
                        className="w-full"
                      >
                        {loading ? "Carregando..." : "POST /api/users"}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline">PUT</Badge>
                        Atualizar Usuário
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input placeholder="ID do usuário" id="update-user-id" type="number" />
                      <Input placeholder="Novo nome" id="update-user-name" />
                      <Input placeholder="Novo email" id="update-user-email" type="email" />
                      <Button
                        onClick={() => {
                          const id = (document.getElementById("update-user-id") as HTMLInputElement).value
                          const name = (document.getElementById("update-user-name") as HTMLInputElement).value
                          const email = (document.getElementById("update-user-email") as HTMLInputElement).value

                          if (id) {
                            const body: any = {}
                            if (name) body.name = name
                            if (email) body.email = email
                            makeRequest("PUT", `/api/users/${id}`, body)
                          }
                        }}
                        disabled={loading}
                        className="w-full"
                      >
                        {loading ? "Carregando..." : "PUT /api/users/:id"}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="destructive">DELETE</Badge>
                        Deletar Usuário
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input placeholder="ID do usuário" id="delete-user-id" type="number" />
                      <Button
                        onClick={() => {
                          const id = (document.getElementById("delete-user-id") as HTMLInputElement).value
                          if (id) {
                            makeRequest("DELETE", `/api/users/${id}`)
                          }
                        }}
                        disabled={loading}
                        variant="destructive"
                        className="w-full"
                      >
                        {loading ? "Carregando..." : "DELETE /api/users/:id"}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Posts Tab */}
                <TabsContent value="posts" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="secondary">GET</Badge>
                        Listar Posts
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button onClick={() => makeRequest("GET", "/api/posts")} disabled={loading} className="w-full">
                        {loading ? "Carregando..." : "GET /api/posts"}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="default">POST</Badge>
                        Criar Post
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input placeholder="Título" id="post-title" />
                      <Textarea placeholder="Conteúdo" id="post-content" />
                      <Input placeholder="ID do autor" id="post-author" type="number" />
                      <Button
                        onClick={() => {
                          const title = (document.getElementById("post-title") as HTMLInputElement).value
                          const content = (document.getElementById("post-content") as HTMLTextAreaElement).value
                          const authorId = Number.parseInt(
                            (document.getElementById("post-author") as HTMLInputElement).value,
                          )

                          if (title && content && authorId) {
                            makeRequest("POST", "/api/posts", { title, content, authorId })
                          }
                        }}
                        disabled={loading}
                        className="w-full"
                      >
                        {loading ? "Carregando..." : "POST /api/posts"}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="secondary">GET</Badge>
                        Buscar Post por ID
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input placeholder="ID do post" id="get-post-id" type="number" />
                      <Button
                        onClick={() => {
                          const id = (document.getElementById("get-post-id") as HTMLInputElement).value
                          if (id) {
                            makeRequest("GET", `/api/posts/${id}`)
                          }
                        }}
                        disabled={loading}
                        className="w-full"
                      >
                        {loading ? "Carregando..." : "GET /api/posts/:id"}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline">PUT</Badge>
                        Atualizar Post
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input placeholder="ID do post" id="update-post-id" type="number" />
                      <Input placeholder="Novo título" id="update-post-title" />
                      <Textarea placeholder="Novo conteúdo" id="update-post-content" />
                      <Input placeholder="Novo ID do autor" id="update-post-author" type="number" />
                      <Button
                        onClick={() => {
                          const id = (document.getElementById("update-post-id") as HTMLInputElement).value
                          const title = (document.getElementById("update-post-title") as HTMLInputElement).value
                          const content = (document.getElementById("update-post-content") as HTMLTextAreaElement).value
                          const authorId = (document.getElementById("update-post-author") as HTMLInputElement).value

                          if (id) {
                            const body: any = {}
                            if (title) body.title = title
                            if (content) body.content = content
                            if (authorId) body.authorId = Number.parseInt(authorId)
                            makeRequest("PUT", `/api/posts/${id}`, body)
                          }
                        }}
                        disabled={loading}
                        className="w-full"
                      >
                        {loading ? "Carregando..." : "PUT /api/posts/:id"}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="destructive">DELETE</Badge>
                        Deletar Post
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input placeholder="ID do post" id="delete-post-id" type="number" />
                      <Button
                        onClick={() => {
                          const id = (document.getElementById("delete-post-id") as HTMLInputElement).value
                          if (id) {
                            makeRequest("DELETE", `/api/posts/${id}`)
                          }
                        }}
                        disabled={loading}
                        variant="destructive"
                        className="w-full"
                      >
                        {loading ? "Carregando..." : "DELETE /api/posts/:id"}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Auth Tab */}
                <TabsContent value="auth" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="default">POST</Badge>
                        Login
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input placeholder="Email" id="login-email" type="email" />
                      <Input placeholder="Senha" id="login-password" type="password" />
                      <Button
                        onClick={() => {
                          const email = (document.getElementById("login-email") as HTMLInputElement).value
                          const password = (document.getElementById("login-password") as HTMLInputElement).value

                          if (email && password) {
                            makeRequest("POST", "/api/auth/login", { email, password })
                          }
                        }}
                        disabled={loading}
                        className="w-full"
                      >
                        {loading ? "Carregando..." : "POST /api/auth/login"}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Response Panel */}
            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Resposta da API</CardTitle>
                  <CardDescription>Resultado da última requisição</CardDescription>
                </CardHeader>
                <CardContent>
                  {response ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            response.status >= 200 && response.status < 300
                              ? "default"
                              : response.status >= 400
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          Status: {response.status}
                        </Badge>
                        <span className="text-sm text-gray-500">{response.timestamp}</span>
                      </div>
                      <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-96">
                        <pre className="text-sm">{JSON.stringify(response.data, null, 2)}</pre>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <p>Nenhuma requisição feita ainda.</p>
                      <p className="text-sm mt-2">Use os controles à esquerda para testar os endpoints da API.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
