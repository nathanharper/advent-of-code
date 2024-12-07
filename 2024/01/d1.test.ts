import { describe, test, expect } from 'bun:test';
import {
  calcDiff,
  calcSimilarity,
  countOccurrences,
  processInput,
  sortAsc,
} from './shared';

const input = `
3   4
4   3
2   5
1   3
3   9
3   3
`.trim();

// converts a Map to an array of key/val pairs for easier comparison
function map2Pairs(map) {
  const res = [];
  for (let [key, val] of map) {
    res.push([key, val]);
  }
  return res.sort((a, b) => {
    return a[0] - b[0];
  });
}

describe('Day 1', () => {
  describe('Part 1', () => {
    describe('processInput', () => {
      test('make two lists of numbers', () => {
        expect(processInput(input)).toEqual([
          [3,4,2,1,3,3],
          [4,3,5,3,9,3],
        ]);
      });
    });

    describe('sort list', () => {
      test('sort a list of numbers, ascending', () => {
        expect(sortAsc([3,4,2,1,3,3])).toEqual([1,2,3,3,3,4]);
      });
    });

    describe('calcDiff', () => {
      test('calculates the total difference between 2 number lists', () => {
        expect(calcDiff([1,2,3,3,3,4], [3,3,3,4,5,9])).toBe(11);
      });
    });
  });

  describe('Part 2', () => {
    describe('countOccurrences', () => {
      test('generate a map of the number of occurrences of each number in a list', () => {
        expect(map2Pairs(countOccurrences([4,3,5,3,9,3]))).toEqual([
          [3, 3],
          [4, 1],
          [5, 1],
          [9, 1],
        ]);
      });
    });

    describe('calcSimilarity', () => {
      test('calculates the similarity sum betwixt two lists', () => {
        expect(calcSimilarity([3,4,2,1,3,3], [4,3,5,3,9,3])).toBe(31);
      });
    });
  });
});
