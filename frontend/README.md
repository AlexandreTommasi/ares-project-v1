# Frontend Foundation

Esta é uma estrutura base para uma aplicação React moderna, escalável e de fácil manutenção, construída com Vite, TypeScript, Styled Components e Zustand.

## Visão Geral da Arquitetura

A estrutura do projeto é projetada para ser modular e escalável, com uma clara separação de responsabilidades.

- `src/components`: Componentes de UI globais e reutilizáveis (Design System).
- `src/config`: Configurações da aplicação, como variáveis de ambiente.
- `src/features`: Módulos de funcionalidades específicas da aplicação. Cada feature é auto-contida.
- `src/hooks`: Hooks customizados reutilizáveis em toda a aplicação.
- `src/lib`: Configuração de bibliotecas de terceiros (ex: instâncias do Axios).
- `src/pages`: Componentes que representam as páginas da aplicação. Eles compõem os componentes das `features`.
- `src/providers`: Provedores de contexto React para toda a aplicação.
- `src/routes`: Definição e configuração das rotas da aplicação.
- `src/store`: Lojas de estado global (Zustand).
- `src/styles`: Estilos globais, temas e utilitários de estilização.
- `src/types`: Definições de tipos TypeScript globais.
- `src/utils`: Funções utilitárias genéricas.

## Começando

### Pré-requisitos

- Node.js (versão 18 ou superior)
- pnpm, npm ou yarn

### Instalação

1. Clone o repositório.
2. Instale as dependências:
   ```bash
   npm install
   ```

### Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento com Vite.
- `npm run build`: Compila a aplicação para produção.
- `npm run lint`: Executa o ESLint para análise estática do código.
- `npm run test`: Executa os testes com Jest.
- `npm run storybook`: Inicia o Storybook para visualização e desenvolvimento de componentes.

## Como Adicionar uma Nova Feature

1.  **Crie a pasta da feature**: Adicione uma nova pasta em `src/features/nome-da-feature`.
2.  **Desenvolva os componentes**: Crie os componentes, hooks e lógica de estado necessários dentro da pasta da feature.
3.  **Crie a página**: Crie um novo componente de página em `src/pages/NomeDaPagina.tsx` que utiliza os componentes da sua nova feature.
4.  **Adicione a rota**: Adicione a nova rota no arquivo `src/routes/index.tsx`, usando `lazy loading` para a página.
