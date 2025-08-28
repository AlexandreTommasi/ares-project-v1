import React from 'react';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 1rem;
  text-align: center;
`;

const Main = styled.main`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Footer = styled.footer`
  background-color: ${({ theme }) => theme.colors.backgroundDark};
  color: ${({ theme }) => theme.colors.textLight};
  padding: 1rem;
  text-align: center;
  font-size: 0.875rem;
`;

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <LayoutContainer>
      <Header>
        <h1>Estrutura Frontend</h1>
      </Header>
      <Main>{children}</Main>
      <Footer>
        <p>© {new Date().getFullYear()} - Todos os direitos reservados.</p>
      </Footer>
    </LayoutContainer>
  );
};
