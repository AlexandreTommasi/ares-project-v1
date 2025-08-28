import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
`;

const NotFoundPage = () => {
  return (
    <NotFoundContainer>
      <h1>404 - Página Não Encontrada</h1>
      <p>A página que você está procurando não existe.</p>
      <Link to="/">Voltar para a página inicial</Link>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
