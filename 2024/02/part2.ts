import { readFileSync } from 'fs';
import {
  processInput,
  isReportSafe as irs,
} from './shared';

export function isReportSafe(list: number): boolean {
  let direction = null;
  let invalid = false;
  for (let i = 0; i < list.length; i++) {
    const x1 = [...list];
    x1.splice(i,1);
    if (irs(x1)) {
      return true;
    }
    if (i === 0) {
      continue;
    }
    const diff = list[i] - list[i - 1];
    const absDiff = Math.abs(diff);
    const newDir = diff / absDiff;
    if (diff === 0 || absDiff > 3 || (direction !== null && newDir !== direction)) {
      invalid = true;
    }
    direction = newDir;
  }
  return !invalid;
}

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
