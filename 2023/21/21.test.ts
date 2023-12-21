import { beforeAll, describe, expect, test } from 'bun:test';
import solve1 from './part1';
import { findStart, getNextSteps, processInput } from './util';

const sample1 = `
...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........
`.trim();

describe('Day 21', () => {
  let data1;
  beforeAll(() => {
    data1 = processInput(sample1);
  });

  test('getNextSteps', () => {
    expect(getNextSteps(data1, [5, 5])).toEqual([
      [4,5],
      [5,4],
    ]);
    expect(getNextSteps(data1, [0,0])).toEqual([
      [0,1],
      [1,0],
    ]);
    expect(getNextSteps(data1, [0,10])).toEqual([
      [1,10],
      [0,9],
    ]);
    expect(getNextSteps(data1, [10,0])).toEqual([
      [9,0],
      [10,1],
    ]);
    expect(getNextSteps(data1, [10,10])).toEqual([
      [9,10],
      [10,9],
    ]);
  });

  test('processInput', () => {
    expect(data1).toEqual([
      '...........',
      '.....###.#.',
      '.###.##..#.',
      '..#.#...#..',
      '....#.#....',
      '.##..S####.',
      '.##..#...#.',
      '.......##..',
      '.##.#.####.',
      '.##..##.##.',
      '...........',
    ]);
  });

  test('findStart', () => {
    expect(findStart(data1)).toEqual([5, 5]);
  });

  describe('Part 1', () => {
    test('solve', () => {
      expect(solve1(sample1, 6)).toBe(16);
    });
  });
});
