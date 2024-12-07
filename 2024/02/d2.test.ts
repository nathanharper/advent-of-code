import { describe, test, expect } from 'bun:test';
import {
  processInput,
  isReportSafe,
} from './shared';
import { solve as solve1 } from './part1';

const input = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`.trim();

describe('Day 2', () => {
  describe('processInput', () => {
    test('processes input into array of arrays of numbers', () => {
      expect(processInput(input)).toEqual([
        [7, 6, 4, 2, 1],
        [1, 2, 7, 8, 9],
        [9, 7, 6, 2, 1],
        [1, 3, 2, 4, 5],
        [8, 6, 4, 4, 1],
        [1, 3, 6, 7, 9],
      ]);
    });
  });

  describe('isReportSafe', () => {
    test('determines if a report is "safe"', () => {
      expect(isReportSafe([7, 6, 4, 2, 1])).toBe(true);
      expect(isReportSafe([1, 2, 7, 8, 9])).toBe(false);
      expect(isReportSafe([9, 7, 6, 2, 1])).toBe(false);
      expect(isReportSafe([1, 3, 2, 4, 5])).toBe(false);
      expect(isReportSafe([8, 6, 4, 4, 1])).toBe(false);
      expect(isReportSafe([1, 3, 6, 7, 9])).toBe(true);
    });
  });

  describe('part 1', () => {
    test('solve', () => {
      expect(solve1(input)).toBe(2);
    });
  });
});
