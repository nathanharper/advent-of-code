import { readFileSync } from 'fs';

export function parseCardNumbers(str: String): [int[], int[]] {
  const [, data] = str.split(': ');
  return data.split(' | ').map(nums => {
    return nums.trim().split(/\s+/).map(n => Number(n));
  });
}

export function calculateScore(winningNums: int[], myNums: int[]): int {
  return myNums.filter(n => winningNums.includes(n)).length;
}

export function generateScoreArray(str: String): int[] {
  return str.split("\n").filter(x => x).map(card => {
    return calculateScore(...parseCardNumbers(card));
  });
}

export function calculateCardsWon(start: int, scores: int[]): int {
  let sum = 1;
  for (let i = 1; i <= scores[start]; i++) {
    sum += calculateCardsWon(start + i, scores);
  }
  return sum;
}

export function solve(data: String): int {
  const scores = generateScoreArray(data);
  return scores.reduce((sum, score, index) => {
    return sum + calculateCardsWon(index, scores);
  }, 0);
}

if (process.argv[2]) {
  const data = readFileSync(process.argv[2]).toString();
  console.log(solve(data));
}
