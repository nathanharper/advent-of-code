import { readFileSync } from 'fs';
import {
  findStart,
  getNextSteps,
  processInput,
} from './util';

export default function solve(input: string): number {
  const data = processInput(input);
  const start = findStart(data);
  let solution = 0;
  const stack = [[start]];
  let trail;
  while (trail = stack.pop()) {
    const next = getNextSteps(data, trail);
    next.forEach(n => {
      if (n[0] === data.length - 1) {
        solution = Math.max(solution, trail.length);
      } else {
        stack.push([...trail, n]);
      }
    });
  }
  return solution;
}

if (process.argv[2]) {
  const input = readFileSync(process.argv[2]).toString();
  console.log(solve(input));
}
