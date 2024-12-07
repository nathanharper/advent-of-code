import { callWithInputFile } from '../util';
import { processInput } from './shared';

export function isExNexus(data: string[][], x: number, y: number) {
  return data[y][x] === 'A'
    && (
      [data[y-1]?.[x-1], data[y+1]?.[x+1]].sort().join('') === 'MS'
      && [data[y-1]?.[x+1], data[y+1]?.[x-1]].sort().join('') === 'MS'
    );
}

export function solve(data: string[][]): number {
  let count = 0;
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[0].length; x++) {
      count += isExNexus(data, x, y) ? 1 : 0;
    }
  }
  return count;
}

console.log(callWithInputFile(x => solve(processInput(x))));
