export const theme = {
  colors: {
    primary: '#007bff',
    primaryDark: '#0056b3',
    secondary: '#6c757d',
    secondaryDark: '#5a6268',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    background: '#f8f9fa',
    backgroundLight: '#ffffff',
    backgroundDark: '#343a40',
    text: '#212529',
    textSecondary: '#6c757d',
    textLight: '#f8f9fa',
    border: '#dee2e6',
    disabled: '#e9ecef',
  },
  fonts: {
    main: "'Segoe UI', sans-serif",
  },
  spacings: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
};

// Adiciona a tipagem para o tema no styled-components
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}

type Theme = typeof theme;
