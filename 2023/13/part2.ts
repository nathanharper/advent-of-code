import { readFileSync } from 'fs';
import { rotate, processData, findPivotScore } from './util';

export function rowDiff(r1: String, r2: String): number {
  return r1.split('').reduce((diff, char, i) => {
    return diff + (char !== r2[i] ? 1 : 0);
  }, 0);
}

export function findSmudgedMatches(str: String, rows: String[]): number[] {
  return rows.reduce((acc, row, i) => {
    if (i % 2 === 0 && rowDiff(str, row) === 1) acc.push(i);
    return acc;
  }, []);
}

export function findPivotScore(valley: String[]): number {
  // loop rows
  for (let y = 0; y < valley.length - 1; y++) {
    const matches = findSmudgedMatches(valley[y], valley.slice(y + 1))
      .map(n => n + 1 + y);

    // loop smudge matches
    for (let i = 0; i < matches.length; i++) {
      const matchIdx = matches[i];
      const startIdx = y + ((matchIdx - y - 1) / 2);

      // loop to check patterns backwards
      for (let z = 0; z <= startIdx; z++) {
        const leftIdx = startIdx - z;
        if (leftIdx === y) {
          if (leftIdx === 0) return startIdx + 1;
          continue;
        }
        const r1 = valley[leftIdx];
        const r2 = valley[startIdx + 1 + z];
        if (r2 && r1 !== r2) break;
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
