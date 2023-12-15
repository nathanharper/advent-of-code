import { readFileSync } from 'fs';
import { hash, processData } from './util';

export default function solve(input: String): number {
  return processData(input).reduce((sum, str) => {
    return sum + hash(str);
  }, 0);
}

if (process.argv[2]) {
  const input = readFileSync(process.argv[2]).toString();
  console.log(solve(input));
}
