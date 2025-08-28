import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';
import api from '@/services/api';
import { GameSession } from '@/types/game';

export default function GamePage() {
  const [session, setSession] = useState<GameSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartGame = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post<GameSession>('/game/start');
      setSession(response.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to start a new game.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 flex flex-col items-center">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle>Number Guessing Game</CardTitle>
          <CardDescription>Guess the number and win!</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {session ? (
            <div>
              <p className="text-lg mb-4">Game started! Session ID: {session.sessionId}</p>
              <p className="text-gray-400">Guessing functionality will be implemented in the next feature.</p>
              <Button onClick={() => setSession(null)} variant="secondary" className="mt-4">End Game</Button>
            </div>
          ) : (
            <div>
              <p className="text-lg mb-6">Click the button below to start a new game.</p>
              <Button onClick={handleStartGame} disabled={isLoading} size="lg">
                {isLoading ? 'Starting...' : 'Start New Game'}
              </Button>
            </div>
          )}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
