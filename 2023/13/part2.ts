import { readFileSync } from 'fs';
import { rotate, processData } from './util';

export function rowDiff(r1: String, r2: String): number {
  return r1.split('').reduce((diff, char, i) => {
    return diff + (char !== r2[i] ? 1 : 0);
  }, 0);
}

export function findPivotScore(valley: String[]): number {
  // loop rows
  for (let y = 0; y < valley.length - 1; y++) {
    // loop smudge matches
    for (let i = y + 1; i < valley.length; i+=2) {
      if (rowDiff(valley[y], valley[i]) !== 1) continue;
      const startIdx = y + ((i - y - 1) / 2);
      // loop to check patterns backwards
      for (let z = 0; z <= startIdx; z++) {
        const leftIdx = startIdx - z;
        const r1 = valley[leftIdx];
        const r2 = valley[startIdx + 1 + z];
        if (r2 && leftIdx !== y && r1 !== r2) break;
        if (leftIdx === 0) return startIdx + 1;
      }
    }
  }

  return 0;
}

export default function solve(input: String): number {
  return processData(input).reduce((sum, valley, index) => {
    const horizontalScore = findPivotScore(valley) * 100;
    if (horizontalScore) return sum + horizontalScore;
    return sum + findPivotScore(rotate(valley));
  }, 0);
}

if (process.argv[2]) {
  const input = readFileSync(process.argv[2]).toString();
  console.log(solve(input));
}
