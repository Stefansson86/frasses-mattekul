export type GameMode = 'plus' | 'minus' | 'mix';

export type DifficultyLevel = 5 | 10;

export interface MathProblem {
  id: string;
  num1: number;
  num2: number;
  operator: '+' | '-';
  answer: number;
  options: number[];
}

export interface PlayerStats {
  totalGoals: number;
  trophies: number;
  currentMatchGoals: number;
  totalCorrect: number;
  favoriteJersey: string;
}
