import { describe, expect, test } from 'bun:test';
import {
  calcRowTotal,
  tilt,
} from './util';
import solve1 from './part1';

const sample1 = `
O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....
`.trim();

describe ('Day 14', () => {
  describe('Util', () => {
    describe('tilt', () => {
      test('it shifts all the round stones in a row', () => {
        expect(tilt('##..O.O.OO')).toEqual('##....OOOO');
        expect(tilt('.#O.#O....')).toEqual('.#.O#....O');
      });
    });

    describe('calcRowTotal', () => {
      test('it calcs the total score for a row', () => {
        expect(calcRowTotal('##..O.O.OO')).toBe(34);
        expect(calcRowTotal('.#O.#O....')).toBe(14);
      });
    });
  });

  describe('Part 1', () => {
    test('solve', () => {
      expect(solve1(sample1)).toBe(136);
    });
  });
});
