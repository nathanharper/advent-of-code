import { readFileSync } from 'fs';
import {
  isReportSafe,
  processInput,
} from './shared';

export function solve(input: string): number {
  const data = processInput(input);
  return data.reduce((acc, report) => {
    if (isReportSafe(report)) {
      return acc + 1;
    }
    return acc;
  }, 0);
}

if (process.argv[2]) {
  console.log(solve(readFileSync(process.argv[2]).toString()))
}
