import { callWithInputFile } from '../util';
const regex = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;

export function solve(input: string): number {
  return input.split("\n").join(' ').trim().match(regex).reduce((acc, match) => {
    if (match === 'do()') {
      acc.enabled = true;
    } else if (match === "don't()") {
      acc.enabled = false;
    } else if (acc.enabled) {
      return {
        ...acc,
        sum: acc.sum + eval(`const mul=(x,y)=>x*y;${match}`),
      };
    }
    return acc;
  }, { sum: 0, enabled: true }).sum;
}

console.log(callWithInputFile(solve));
