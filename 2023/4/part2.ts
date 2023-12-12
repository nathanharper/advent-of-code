import { readFileSync } from 'fs';

export function parseCardNumbers(str: String): [number[], number[]] {
  const [, data] = str.split(': ');
  return data.split(' | ').map(nums => {
    return nums.trim().split(/\s+/).map(n => Number(n));
  });
}

export function calculateScore(winningNums: number[], myNums: number[]): number {
  return myNums.filter(n => winningNums.includes(n)).length;
}

export function generateScoreArray(str: String): number[] {
  return str.split("\n").filter(x => x).map(card => {
    return calculateScore(...parseCardNumbers(card));
  });
}

export function calculateCardsWonRecursive(start: number, scores: number[]): number {
  let sum = 1;
  for (let i = 1; i <= scores[start]; i++) {
    sum += calculateCardsWonRecursive(start + i, scores);
  }
  return sum;
}

export function solve(data: String): number {
  const scores = generateScoreArray(data);
  return scores.reduce((sum, score, index) => {
    return sum + calculateCardsWonRecursive(index, scores);
  }, 0);
}

if (process.argv[2]) {
  const data = readFileSync(process.argv[2]).toString();
  console.log(solve(data));
}
