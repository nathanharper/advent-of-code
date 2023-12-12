import { readFileSync } from 'fs';
import { resolve } from 'path';
import { describe, test, expect, beforeAll } from 'bun:test';
import {
  processData,
  findGalaxyDistance,
  collectAllGalaxies,
  findExpandedRows,
  findExpandedCols,
} from './util';
import solve from './part1';

const sample1 = `
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....
`;

describe('Day 11', () => {
  describe('Util', () => {
    let data1, exRows, exCols;
    beforeAll(() => {
      data1 = processData(sample1);
      exRows = findExpandedRows(data1);
      exCols = findExpandedCols(data1);
    });

    test('processData', () => {
      expect(data1.length).toBe(10);
      expect(data1[0].length).toBe(10);
      expect(data1[0]).toEqual('...#......');
      expect(data1[data1.length - 1]).toEqual('#...#.....');
    });

    test('collectAllGalaxies', () => {
      const galaxies = collectAllGalaxies(data1);
      expect(galaxies).toEqual([
        [0, 3],
        [1, 7],
        [2, 0],
        [4, 6],
        [5, 1],
        [6, 9],
        [8, 7],
        [9, 0],
        [9, 4],
      ]);
    });

    test('findExpandedRows', () => {
      expect(exRows).toEqual([3, 7]);
    });

    test('findExpandedCols', () => {
      expect(exCols).toEqual([2, 5, 8]);
    });

    test('findGalaxyDistance', () => {
      expect(findGalaxyDistance([5, 1], [9, 4], exRows, exCols, 2)).toBe(9);
      expect(findGalaxyDistance([0, 3], [8, 7], exRows, exCols, 2)).toBe(15);
      expect(findGalaxyDistance([2, 0], [6, 9], exRows, exCols, 2)).toBe(17);
      expect(findGalaxyDistance([9, 0], [9, 4], exRows, exCols, 2)).toBe(5);
      expect(findGalaxyDistance([2, 0], [4, 6], exRows, exCols, 2)).toBe(11);
      expect(findGalaxyDistance([2, 0], [4, 6], exRows, exCols, 10)).toBe(35);
    });
  });

  describe('Part 1', () => {
    let data;
    beforeAll(() => {
      data = readFileSync(resolve(__dirname, 'data.txt')).toString();
    });

    test('solver', () => {
      expect(solve(sample1, 2)).toBe(374);
      expect(solve(sample1, 10)).toBe(1030);
      expect(solve(sample1, 100)).toBe(8410);
      expect(solve(data, 2)).toBe(9947476);
    });
  });
});
