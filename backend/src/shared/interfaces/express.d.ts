import { UserRole } from "@/modules/auth/auth.types";

// Estende o objeto Request do Express para adicionar a propriedade 'user'.
// Isso permite que middlewares de autenticação anexem informações do usuário
// à requisição de forma type-safe.

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: UserRole;
      };
    }
  }
}
