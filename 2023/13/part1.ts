import { readFileSync } from 'fs';
import { rotate, processData, findPivotScore } from './util';

export default function solve(input: String): number {
  return processData(input).reduce((sum, valley, index) => {
    const horizontalScore = findPivotScore(valley) * 100;
    if (horizontalScore) return sum + horizontalScore;
    return sum + findPivotScore(rotate(valley));
  }, 0);
}

if (process.argv[2]) {
  const input = readFileSync(process.argv[2]).toString();
  console.log(solve(input));
}
