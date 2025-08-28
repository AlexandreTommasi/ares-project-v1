/**
 * Formata um número como moeda brasileira (BRL).
 * @param value - O número a ser formatado.
 * @returns A string formatada.
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

/**
 * Formata uma data para o padrão brasileiro (dd/mm/yyyy).
 * @param date - O objeto Date ou string de data a ser formatada.
 * @returns A string da data formatada.
 */
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-BR').format(dateObj);
};
