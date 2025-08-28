import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/shared/styles/theme';
import { Button } from './index';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Button Component', () => {
  it('should render with default props', () => {
    renderWithTheme(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('should be disabled when the disabled prop is true', () => {
    renderWithTheme(<Button disabled>Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeDisabled();
  });

  it('should apply secondary variant styles', () => {
    renderWithTheme(<Button variant="secondary">Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toHaveStyle(`background-color: ${theme.colors.secondary}`);
  });
});
