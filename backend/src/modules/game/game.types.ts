export interface GameConfig {
  minRange: number;
  maxRange: number;
}

export interface GameSession {
  sessionId: string;
  secretNumber: number;
  attempts: number;
  startTime: Date;
  isFinished: boolean;
}
