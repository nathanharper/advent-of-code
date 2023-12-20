import { readFileSync } from 'fs';
import { Machine } from './util';

export default function solve(input: String, pressCount: number): number {
  const mach = new Machine(input);
  for (let i = 1; i <= pressCount; i++) mach.cycle();
  return mach.pulseCounts[0] * mach.pulseCounts[1];
}

if (process.argv[3]) {
  const input = readFileSync(process.argv[2]).toString();
  console.log(solve(input, Number(process.argv[3])));
}
