import { describe, test, expect } from 'bun:test';
import { processInput } from './shared';
import { solve as solve1, getXmasCountByPos } from './part1';
import { solve as solve2, isExNexus } from './part2';

const input = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`.trim();

describe('Day 4', () => {
  test('processInput', () => {
    expect(processInput(input)).toEqual([
      ['M','M','M','S','X','X','M','A','S','M'],
      ['M','S','A','M','X','M','S','M','S','A'],
      ['A','M','X','S','X','M','A','A','M','M'],
      ['M','S','A','M','A','S','M','S','M','X'],
      ['X','M','A','S','A','M','X','A','M','M'],
      ['X','X','A','M','M','X','X','A','M','A'],
      ['S','M','S','M','S','A','S','X','S','S'],
      ['S','A','X','A','M','A','S','A','A','A'],
      ['M','A','M','M','M','X','M','M','M','M'],
      ['M','X','M','X','A','X','M','A','S','X'],
    ]);
  });

  describe('Part 1', () => {
    test('getXmasCountByPos', () => {
      expect(getXmasCountByPos(processInput(input), 6, 4)).toBe(2);
    });

    test('solve', () => {
      expect(solve1(processInput(input))).toBe(18);
    });
  });

  describe('Part 2', () => {
    test('isExNexus', () => {
      expect(isExNexus(processInput(input), 2, 1)).toBe(true);
      expect(isExNexus(processInput(input), 4, 4)).toBe(false);
    });

    test('solve', () => {
      expect(solve2(processInput(input))).toBe(9);
    });
  });
});
