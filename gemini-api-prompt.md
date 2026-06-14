# Instruções de Integração com Back-end para o Gemini CLI

**Contexto do Projeto:**
Estamos desenvolvendo um "Dashboard Financeiro" utilizando Vue 3 (Composition API), TypeScript, Quasar e TailwindCSS.
Atualmente, os dados de carteiras (Wallets) e transações (Transactions) estão sendo salvos no `localStorage`.
A tarefa é criar a camada de integração com a API real (Swagger em http://localhost:8080/swagger-ui/index.html) e substituir a persistência local.

Por favor, atue como um desenvolvedor Front-end Sênior e execute as seguintes tarefas em ordem:

## 📦 Tarefa 1: Criar as Interfaces/Tipos

Crie um arquivo `src/types/api.ts` (ou atualize se já existir) e defina as seguintes interfaces com base nos DTOs do back-end:

**WalletDTO:**

- `id`: string
- `name`: string
- `color`: string
- `userId`: string

**TransactionDTO:**

- `id`: string
- `name`: string
- `value`: number
- `description`: string
- `date`: string
- `installment`: string
- `type`: string ('income' | 'expense')
- `walletId`: string
- `userId`: string

## 🔌 Tarefa 2: Criar o Cliente HTTP

Crie um arquivo `src/api/axios.ts`.

- Instancie e exporte o `axios.create()` apontando para a baseURL: `http://localhost:8080`.
- Opcional: Adicione um interceptor para tratamento genérico de erros.

## 🛠 Tarefa 3: Criar os Serviços da API

Crie uma pasta `src/services/` e implemente dois arquivos: `WalletService.ts` e `TransactionService.ts`.

- Ambos devem importar a instância do Axios criada na Tarefa 2.
- Implemente os métodos básicos de CRUD (GET, POST, PUT, DELETE) utilizando as rotas padrão (ex: `/wallets`, `/transactions`).
- Certifique-se de tipar os retornos de cada método com as interfaces criadas na Tarefa 1.

## 🔄 Tarefa 4: Refatorar o Estado (Remover LocalStorage)

Atualmente existe um composable ou store (possivelmente atrelado ao Pinia ou um composable de estado local) que lê e escreve no `localStorage` sob a chave `finance-dashboard-data`.

- Refatore esse arquivo para remover o acesso ao `localStorage`.
- Substitua as lógicas de leitura e escrita pelas chamadas aos métodos do `WalletService` e `TransactionService`.
- Adicione estados de `isLoading` (boolean) e `error` (string | null) para gerenciar o feedback visual no front-end durante as requisições HTTP.

## 📜 Regras de Estilo

- Use **TypeScript** rigorosamente (tipos em parâmetros e retornos).
- Use `async/await` ao invés de encadear `.then()`.
- Envolva as chamadas HTTP em blocos `try/catch`.
- Escreva código limpo, modular e aderente às boas práticas do Vue 3 e Composition API.
