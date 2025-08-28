import { z } from 'zod';

export const updateConfigSchema = z.object({
  body: z.object({
    minRange: z.number().int('O valor mínimo deve ser um número inteiro.'),
    maxRange: z.number().int('O valor máximo deve ser um número inteiro.'),
  }).refine(data => data.minRange < data.maxRange, {
    message: 'O valor mínimo deve ser estritamente menor que o valor máximo.',
    path: ['minRange'], // Campo onde o erro será associado
  }),
});
