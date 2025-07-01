# Design Document: Dhamma Kitchen

Aplicativo LocalFirst de controle de estoque e geração de pedidos para o centro de meditação.

## Stack
- Typescript
- React
- Vite
State Management:
- Jazz Tools (LocalFirst)
Auth:
- Clerk
Routing:
- Tanstack Router
UI:
- Tanstack Forms
- ShadcnUI
- Tailwind

## Features

### Workspace
- Criação de um novo workspace
  - Dialog com um formulário em que se coloca o nome do workspace e confirma
  - `./src/features/workspace/components/create-workspace-dialog-button.tsx`
  - `./src/features/workspace/form/create-workspace-form.tsx`
- Listagem dos workspaces desse usuário `./src/features/workspace/components/user-workspaces-list.tsx`
- Detalhes do workspace atual
  - `./src/features/workspace/components/workspace-details.tsx`
  - Contém
    - Nome do workspace
    - Link de Invite (com botão de Copy)
    - Display dos usuários do workspace

### Controle / Cadastro de Itens
### Controle / Cadastro de Vendedores
### Controle / Cadastro de Demandas Recorrentes
### Controle de Pedidos

# Fluxos
## Fluxo 1 -


### 1. Controle de Estoque
- Listagem de todos os itens presentes no estoque
- Categorias
  - Limpeza
  - Higiente
  - Alimentos
  - Hortifrut

### 2. Controle de demanda de itens
- Planilha de "nome do item" x "quantidade necessária do item"
- "Carrinho de compras de demandas"

Cálculo da demanda
- Planilha de "nome do item" x "quantidade necessária do item" x "quantidade atual do item" x "quantidade a ser comprada do item"

Criação das listas de compras
- Lista mestra -> "nome do item" x "quantidade a ser comprada do item"

Agrupamento da lista mestra nas listas específicas por vendedores
(Pedidos)

Manutenção dos vendedores
- Perfil

Criação dos Pedidos
