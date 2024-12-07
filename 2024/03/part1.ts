import { callWithInputFile } from '../util';
const regex = /mul\(\d{1,3},\d{1,3}\)/g;

export function solve(input: string): number {
  return input.split("\n").join(' ').trim().match(regex).reduce((acc, match) => {
    return acc + eval(`const mul=(x,y)=>x*y;${match}`);
  }, 0);
}

console.log(callWithInputFile(solve));
