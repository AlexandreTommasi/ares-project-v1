import styled, { css } from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
}

const variants = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border: 1px solid ${({ theme }) => theme.colors.primary};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primaryDark};
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.secondary};
    color: white;
    border: 1px solid ${({ theme }) => theme.colors.secondary};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.secondaryDark};
    }
  `,
};

export const Button = styled.button<ButtonProps>`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  ${({ variant = 'primary' }) => variants[variant]};

  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed;
    border-color: ${({ theme }) => theme.colors.disabled};
  }
`;
