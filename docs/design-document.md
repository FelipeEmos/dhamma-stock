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

### Controle / Criação de Workspaces
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
