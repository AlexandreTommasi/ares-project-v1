import { GuessingGame } from '@/features/game/components/GuessingGame';
import styled from 'styled-components';

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 1rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
`;

const HomePage = () => {
  return (
    <HomePageContainer>
      <Title>Jogo da Adivinhação</Title>
      <p>Tente adivinhar o número secreto entre 1 e 100.</p>
      <GuessingGame />
    </HomePageContainer>
  );
};

export default HomePage;
