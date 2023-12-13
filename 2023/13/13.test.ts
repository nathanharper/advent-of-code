import { beforeAll, describe, expect, test } from 'bun:test';
import {
  findPivotScore,
  processData,
  rotate,
} from './util';
import solve1 from './part1';
import solve2, {
  rowDiff,
  findSmudgedMatches,
  findPivotScore as findPivotScore2,
} from './part2';

const sample1 = `
#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#
`.trim();

const sampleValley1 = [
  '#.##..##.',
  '..#.##.#.',
  '##......#',
  '##......#',
  '..#.##.#.',
  '..##..##.',
  '#.#.##.#.',
];

const sampleValley2 = [
  '#...##..#',
  '#....#..#',
  '..##..###',
  '#####.##.',
  '#####.##.',
  '..##..###',
  '#....#..#',
];

describe('Day 13', () => {
  let data1;
  beforeAll(() => {
    data1 = processData(sample1);
  });

  describe('Util', () => {
    describe('rotate', () => {
      test('it rotates a valley', () => {
        const rotated = rotate(sampleValley1);
        expect(rotated.length).toBe(9);
        expect(rotated[0].length).toBe(7);
        expect(rotated).toEqual([
          '#..##.#',
          '...##..',
          '###..##',
          '.#....#',
          '#.#..#.',
          '#.#..#.',
          '.#....#',
          '###..##',
          '...##..',
        ]);
      });
    });

    describe('processData', () => {
      test('given a multiline data string, extract a the valleys', () => {
        const [m1, m2] = data1;
        expect(m1.length).toBe(7);
        expect(m1[0].length).toBe(9);

        expect(m2.length).toBe(7);
        expect(m2[0].length).toBe(9);
      });
    });

    describe('findPivotScore', () => {
      test('finds the horizontal pivot score, given a valley', () => {
        expect(findPivotScore(rotate(sampleValley1))).toBe(5);
        expect(findPivotScore(sampleValley2)).toBe(4);
      });
    });
  });

  describe('Part 1', () => {
    test('solve', () => {
      expect(solve1(sample1)).toBe(405);
    });
  });

  describe('Part 2', () => {
    describe('rowDiff', () => {
      test('gets a count of the differing chars between 2 strings', () => {
        expect(rowDiff('#.##..##.', '..##..##.')).toBe(1);
        expect(rowDiff('####..##.', '..##..##.')).toBeGreaterThan(1);
        expect(rowDiff('..##..##.', '..##..##.')).toBe(0);
      });
    });

    describe('findSmudgedMatches', () => {
      test('given a string and a string array, returns an array of indices of entries that are off by 1 char', () => {
        expect(findSmudgedMatches('#.##..##', [
          '..#.##.#.',
          '##......#',
          '##......#',
          '..#.##.#.',
          '..##..##.',
          '#.#.##.#.',
        ])).toEqual([4]);
      });
    });

    describe('findPivotScore', () => {
      test('finds the pivot score accounting for smudge', () => {
        expect(findPivotScore2(sampleValley1)).toBe(3);
        expect(findPivotScore2(sampleValley2)).toBe(1);
      });
    });

    test('solve', () => {
      expect(solve2(sample1)).toBe(400);
    });
  });
});
