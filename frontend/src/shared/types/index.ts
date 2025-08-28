// Exemplo de um tipo compartilhado
export interface User {
  id: string;
  name: string;
  email: string;
}

// Tipos para uma API de paginação genérica
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
