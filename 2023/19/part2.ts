import { readFileSync } from 'fs';
import { evaluateRatings, processInput } from './util';

export default function solve(input: String): number {
  const [workflows] = processInput(input);
  let sum = 0;
  for (let x=1; x <= 4000; x++) {
    for (let m=1; m <= 4000; m++) {
      for (let a=1; m <= 4000; a++) {
        for (let s=1; m <= 4000; s++) {
          if (evaluateRatings({x,m,a,s}, workflows, 'in')) {
            sum += x+m+a+s;
          }
        }
      }
    }
  }
  return sum;
}

if (process.argv[2]) {
  const input = readFileSync(process.argv[2]).toString();
  console.log(solve(input));
}
