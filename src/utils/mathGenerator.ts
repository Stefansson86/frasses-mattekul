import { MathProblem, GameMode, DifficultyLevel } from '../types';

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateProblem(mode: GameMode, max: DifficultyLevel, previousId?: string): MathProblem {
  let operator: '+' | '-';
  if (mode === 'mix') {
    operator = Math.random() > 0.5 ? '+' : '-';
  } else {
    operator = mode === 'plus' ? '+' : '-';
  }

  let num1: number;
  let num2: number;
  let answer: number;

  if (operator === '+') {
    // Addition: num1 >= 1, num2 >= 1, answer <= max (inga nollor)
    answer = Math.floor(Math.random() * (max - 1)) + 2; // 2 till max
    num1 = Math.floor(Math.random() * (answer - 1)) + 1; // 1 till answer - 1
    num2 = answer - num1; // 1 till answer - 1
  } else {
    // Subtraktion: num1 >= 2, num2 >= 1, answer >= 1 (inga nollor)
    num1 = Math.floor(Math.random() * (max - 1)) + 2; // 2 till max
    num2 = Math.floor(Math.random() * (num1 - 1)) + 1; // 1 till num1 - 1
    answer = num1 - num2; // >= 1
  }

  // Number of options: 3 when max is 5, 4 when max is 10
  const totalOptions = max === 5 ? 3 : 4;
  const distractors = new Set<number>();

  // Prefer realistic nearby distractors first (mellan 1 och max)
  const candidates = [answer - 1, answer + 1, answer - 2, answer + 2, answer + 3, answer - 3];
  for (const c of candidates) {
    if (c >= 1 && c <= max && c !== answer) {
      distractors.add(c);
      if (distractors.size >= totalOptions - 1) break;
    }
  }

  // If still need more, pick any valid number in range 1..max
  let attempts = 0;
  while (distractors.size < totalOptions - 1 && attempts < 25) {
    const randomNum = Math.floor(Math.random() * max) + 1; // 1 till max
    if (randomNum !== answer) {
      distractors.add(randomNum);
    }
    attempts++;
  }

  const options = shuffle([answer, ...Array.from(distractors)]);

  const id = `${num1}${operator}${num2}-${Date.now()}`;
  if (id === previousId) {
    return generateProblem(mode, max);
  }

  return {
    id,
    num1,
    num2,
    operator,
    answer,
    options,
  };
}
