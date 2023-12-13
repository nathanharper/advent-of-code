import { beforeAll, describe, expect, test } from 'bun:test';
import {
  findPivotScore,
  processData,
  rotate,
} from './util';
import solve1 from './part1';

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
});
