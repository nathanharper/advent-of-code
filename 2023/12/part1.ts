import { readFileSync } from 'fs';
import { countRowArrangements, structureData } from './util';

export default function solve(input: String): number {
  return structureData(input).reduce((sum, data): number => {
    return sum + countRowArrangements(...data);
  }, 0);
}

if (process.argv[2]) {
  const data = readFileSync(process.argv[2]).toString();
  console.log(solve(data));
}
