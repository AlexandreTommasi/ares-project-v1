import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import styled from 'styled-components';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  width: 100%;
  max-width: 400px;
`;

const FeedbackText = styled.p`
  font-weight: bold;
  min-height: 2.5em; /* Garante espaço para o feedback */
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export const GuessingGame = () => {
  const [inputValue, setInputValue] = useState('');
  const {
    feedback,
    attempts,
    isGameOver,
    makeGuess,
    resetGame,
  } = useGameStore();

  const handleGuess = () => {
    const num = parseInt(inputValue, 10);
    if (!isNaN(num)) {
      makeGuess(num);
      setInputValue('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleGuess();
    }
  };

  return (
    <GameContainer>
      <FeedbackText>{feedback}</FeedbackText>
      <Input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Digite seu palpite"
        disabled={isGameOver}
      />
      <ActionsContainer>
        <Button onClick={handleGuess} disabled={isGameOver || !inputValue}>
          Adivinhar
        </Button>
        <Button onClick={resetGame} variant="secondary">
          Novo Jogo
        </Button>
      </ActionsContainer>
      <p>Tentativas: {attempts}</p>
    </GameContainer>
  );
};
