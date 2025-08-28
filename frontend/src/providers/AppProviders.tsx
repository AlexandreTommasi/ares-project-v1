import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '@/shared/styles/GlobalStyles';
import { theme } from '@/shared/styles/theme';

interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * Componente que agrupa todos os provedores de contexto da aplicação.
 * Ex: ThemeProvider, QueryClientProvider, AuthProvider, etc.
 */
export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};
