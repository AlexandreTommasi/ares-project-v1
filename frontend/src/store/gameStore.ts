import { create } from 'zustand';

// Define os tipos para o estado e as ações
interface GameState {
  secretNumber: number;
  guess: number | null;
  feedback: string;
  attempts: number;
  isGameOver: boolean;
}

interface GameActions {
  startNewGame: (min?: number, max?: number) => void;
  makeGuess: (guess: number) => void;
  resetGame: () => void;
}

// Função para gerar um número aleatório
const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const initialState: GameState = {
  secretNumber: generateRandomNumber(1, 100),
  guess: null,
  feedback: 'Faça sua primeira tentativa!',
  attempts: 0,
  isGameOver: false,
};

/**
 * Store do Zustand para gerenciar o estado do jogo.
 */
export const useGameStore = create<GameState & GameActions>((set, get) => ({
  ...initialState,

  startNewGame: (min = 1, max = 100) => {
    set({
      ...initialState,
      secretNumber: generateRandomNumber(min, max),
    });
  },

  makeGuess: (guess: number) => {
    if (get().isGameOver) return;

    const { secretNumber } = get();
    let feedback = '';
    let isGameOver = false;

    if (guess < secretNumber) {
      feedback = 'Muito baixo! Tente um número maior.';
    } else if (guess > secretNumber) {
      feedback = 'Muito alto! Tente um número menor.';
    } else {
      feedback = `Parabéns! Você acertou o número em ${get().attempts + 1} tentativas.`;
      isGameOver = true;
    }

    set((state) => ({
      guess,
      feedback,
      isGameOver,
      attempts: state.attempts + 1,
    }));
  },

  resetGame: () => {
    get().startNewGame();
  },
}));
