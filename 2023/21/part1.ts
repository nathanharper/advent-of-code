import { readFileSync } from 'fs';
import { findStart, getNextSteps, processInput } from './util';

const reset = "\x1b[0m";
const green = "\x1b[32m";

export default function solve(input: string, steps: number): number {
  const data = processInput(input);
  const evenSteps = steps % 2 === 0;
  const evens = new Set();
  const odds = new Set();
  let stack = [findStart(data)];
  while (steps && stack) {
    const isEven = steps % 2 === 0;
    stack = stack.reduce((acc, pos) => {
      const hash = pos.join(',');
      if (evens.has(hash) || odds.has(hash)) return acc;
      (isEven ? evens : odds).add(hash);
      return acc.concat(getNextSteps(data, pos));
    }, []);
    steps--;
  }
  stack.forEach(p => {
    (evenSteps ? evens : odds).add(p.join(','));
  });
  //visualize(data, evenSteps ? evens : odds);
  return (evenSteps ? evens : odds).size;
}

function visualize(data: string[], set: Set): void {
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[0].length; x++) {
      const tile = data[y][x];
      if (set.has([y,x].join(','))) process.stdout.write(`${green}X${reset}`);
      else process.stdout.write(tile);
    }
    process.stdout.write('\n');
  }
}

if (process.argv[3]) {
  const input = readFileSync(process.argv[2]).toString();
  const steps = Number(process.argv[3]);
  console.log(solve(input, steps));
}
