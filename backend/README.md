# Backend Foundation

Esta é uma estrutura de fundação para projetos backend construídos com Node.js, Express, TypeScript e SQL Server. A arquitetura é modular e projetada para ser escalável e de fácil manutenção.

## Estrutura de Pastas

- **/src**: Contém todo o código-fonte da aplicação.
  - **/config**: Arquivos de configuração (ambiente, banco de dados, etc.).
  - **/core**: Lógica central e transversal (middlewares, erros, logging).
  - **/database**: Gerenciamento da conexão com o banco de dados.
  - **/modules**: O coração da aplicação. Cada subpasta é um módulo de funcionalidade (ex: `users`, `products`).
  - **/routes**: Ponto de entrada que agrega todas as rotas dos módulos.
  - **/shared**: Código compartilhado entre diferentes módulos (interfaces, serviços comuns).
  - `app.ts`: Configuração principal do Express.
  - `server.ts`: Ponto de entrada da aplicação (inicialização do servidor).
- **/tests**: Contém todos os testes (unitários, integração).

## Como Adicionar uma Nova Funcionalidade (Módulo)

1.  Crie uma nova pasta dentro de `src/modules`. Por exemplo, `src/modules/games`.
2.  Dentro da nova pasta, crie os arquivos necessários seguindo a separação de responsabilidades:
    - `games.routes.ts`: Define as rotas HTTP (ex: `/games`). **Este arquivo é obrigatório para que as rotas sejam registradas automaticamente.**
    - `games.controller.ts`: Lida com as requisições e respostas HTTP.
    - `games.service.ts`: Contém a lógica de negócio.
    - `games.repository.ts`: Lida com o acesso aos dados (consultas ao SQL Server).
    - `games.types.ts`: Define os tipos e interfaces específicos do módulo.
    - `games.validation.ts`: Define os esquemas de validação (Zod) para as requisições.
3.  Exporte o `router` do Express no arquivo `games.routes.ts`.

O sistema de roteamento em `src/routes/index.ts` irá carregar e registrar automaticamente as novas rotas. Nenhuma alteração manual é necessária fora da pasta do módulo.

## Comandos Disponíveis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento com hot-reload.
- `npm run build`: Compila o código TypeScript para JavaScript.
- `npm start`: Inicia o servidor em modo de produção (requer `npm run build` antes).
- `npm test`: Executa os testes.

