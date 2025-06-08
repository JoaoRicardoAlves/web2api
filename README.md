# RESTful API - Users & Posts

Uma API RESTful completa para gerenciamento de usuários e posts, construída com Next.js, TypeScript e Prisma ORM.

## 🚀 Características

- **TypeScript**: Tipagem forte em toda a aplicação
- **Prisma ORM**: Modelagem de dados type-safe
- **Validação robusta**: Validação de entrada e tratamento de erros
- **Documentação completa**: Endpoints documentados com exemplos
- **Interface de teste**: UI para testar todos os endpoints
- **Mock data**: Dados em memória para demonstração

## 📋 Modelos de Dados

### User (Usuário)
\`\`\`typescript
{
  id: number;
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
  posts?: Post[];
}
\`\`\`

### Post
\`\`\`typescript
{
  id: number;
  title: string;
  content: string;
  published: boolean;
  authorId: number;
  author?: User;
  createdAt: Date;
  updatedAt: Date;
}
\`\`\`

## 🛠 Endpoints da API

### Usuários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/users` | Lista todos os usuários |
| POST | `/api/users` | Cria um novo usuário |
| GET | `/api/users/:id` | Busca usuário por ID |
| PUT | `/api/users/:id` | Atualiza usuário |
| DELETE | `/api/users/:id` | Remove usuário |

### Posts

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/posts` | Lista todos os posts |
| POST | `/api/posts` | Cria um novo post |
| GET | `/api/posts/:id` | Busca post por ID |
| PUT | `/api/posts/:id` | Atualiza post |
| DELETE | `/api/posts/:id` | Remove post |

### Autenticação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/auth/login` | Autentica usuário |

## 📖 Exemplos de Uso

### Criar Usuário
\`\`\`bash
POST /api/users
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "password": "senha123"
}
\`\`\`

### Criar Post
\`\`\`bash
POST /api/posts
Content-Type: application/json

{
  "title": "Meu Primeiro Post",
  "content": "Este é o conteúdo do meu post.",
  "authorId": 1,
  "published": true
}
\`\`\`

### Login
\`\`\`bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "joao@exemplo.com",
  "password": "senha123"
}
\`\`\`

## 🔧 Instalação e Uso

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Execute o projeto: `npm run dev`
4. Acesse `http://localhost:3000` para ver a documentação
5. Use `/test` para testar os endpoints interativamente

## 📚 Estrutura do Projeto

```
├── app/
│   ├── api/
│   │   ├── users/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── posts/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   └── auth/
│   │       └── login/route.ts
│   ├── docs/page.tsx
│   ├── test/page.tsx
│   └── page.tsx
├── lib/
│   ├── types.ts
│   ├── mock-data.ts
│   └── validation.ts
├── prisma/
│   └── schema.prisma
└── README.md
```

## 🎯 Recursos Implementados

- ✅ CRUD completo para usuários
- ✅ CRUD completo para posts
- ✅ Relacionamentos entre usuários e posts
- ✅ Validação de dados de entrada
- ✅ Tratamento de erros padronizado
- ✅ Autenticação básica
- ✅ Documentação interativa
- ✅ Interface de teste
- ✅ Tipagem TypeScript completa
- ✅ Estrutura Prisma ORM

## 🔒 Tratamento de Erros

A API retorna erros padronizados com os seguintes códigos:

- **400**: Bad Request - Dados inválidos
- **401**: Unauthorized - Credenciais inválidas
- **404**: Not Found - Recurso não encontrado
- **409**: Conflict - Conflito de dados
- **500**: Internal Server Error - Erro interno

## 🚀 Próximos Passos

Para usar em produção, considere implementar:

- Conexão real com banco de dados
- Autenticação JWT completa
- Middleware de autorização
- Rate limiting
- Logs estruturados
- Testes automatizados
- Paginação avançada
- Cache de dados
