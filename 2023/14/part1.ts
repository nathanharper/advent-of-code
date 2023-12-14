import { readFileSync } from 'fs';
import { calcRowTotal, rotate, tilt } from './util';

export default function solve(input: String): number {
  return rotate(input.split("\n").filter(x => x)).reduce((sum, row) => {
    return sum + calcRowTotal(row);
  }, 0);
}

if (process.argv[2]) {
  const input = readFileSync(process.argv[2]).toString();
  console.log(solve(input));
}
