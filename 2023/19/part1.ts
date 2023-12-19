import { readFileSync } from 'fs';
import { evaluateRatings, getRatingsScore, processInput } from './util';

export default function solve(input: String): number {
  const [workflows, ratings] = processInput(input);
  return ratings.reduce((sum, r) => {
    if (evaluateRatings(r, workflows, 'in')) {
      return sum + getRatingsScore(r);
    }
    return sum;
  }, 0);
}

if (process.argv[2]) {
  const input = readFileSync(process.argv[2]).toString();
  console.log(solve(input));
}
