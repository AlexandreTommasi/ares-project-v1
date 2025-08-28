# Diretório de Módulos

Este diretório contém a lógica de negócio da aplicação, separada por domínios ou funcionalidades.

## Como criar um novo módulo:

1.  **Crie uma pasta**: Adicione uma nova pasta com o nome do seu módulo (ex: `users`, `products`).

2.  **Crie os arquivos do módulo**:
    -   `[nome].routes.ts`: (Obrigatório) Define as rotas HTTP para o módulo. Deve exportar um `express.Router()`.
    -   `[nome].controller.ts`: Lida com a lógica de requisição/resposta.
    -   `[nome].service.ts`: Contém a lógica de negócio principal.
    -   `[nome].repository.ts`: Responsável pela comunicação com o banco de dados.
    -   `[nome].validation.ts`: Esquemas de validação (Zod) para as requisições.
    -   `[nome].types.ts`: Tipos e interfaces específicas do módulo.

3.  **Exemplo (`products.routes.ts`)**:

    ```typescript
    import { Router } from 'express';
    // import controller, middlewares, etc.

    const router = Router();

    router.get('/', /* controller.getAll */);
    router.post('/', /* validation, controller.create */);

    export default router;
    ```

O roteador principal (`src/routes/index.ts`) irá automaticamente detectar e registrar qualquer arquivo `*.routes.ts` dentro das subpastas deste diretório.
