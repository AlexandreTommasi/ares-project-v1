import axios from 'axios';
import { config } from '@/config';

/**
 * Instância do Axios pré-configurada.
 * Inclui a URL base da API e pode ser estendida para adicionar interceptors
 * para tratamento de autenticação, erros, etc.
 */
export const apiClient = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Exemplo de interceptor para adicionar um token de autenticação
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
