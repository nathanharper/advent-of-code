import { beforeAll, describe, expect, test } from 'bun:test';
import {
  findStart,
  getNextSteps,
  processInput,
} from './util';
import solve1 from './part1';

const sample = `
#.#####################
#.......#########...###
#######.#########.#.###
###.....#.>.>.###.#.###
###v#####.#v#.###.#.###
###.>...#.#.#.....#...#
###v###.#.#.#########.#
###...#.#.#.......#...#
#####.#.#.#######.#.###
#.....#.#.#.......#...#
#.#####.#.#.#########v#
#.#...#...#...###...>.#
#.#.#v#######v###.###v#
#...#.>.#...>.>.#.###.#
#####v#.#.###v#.#.###.#
#.....#...#...#.#.#...#
#.#########.###.#.#.###
#...###...#...#...#.###
###.###.#.###v#####v###
#...#...#.#.>.>.#.>.###
#.###.###.#.###.#.#v###
#.....###...###...#...#
#####################.#
`.trim();

describe('Day 22', () => {
  let data;
  beforeAll(() => {
    data = processInput(sample);
  });

  test('processInput', () => {
    expect(data[0]).toEqual('#.#####################');
    expect(data[data.length - 1]).toEqual('#####################.#');
  });

  test('findStart', () => {
    expect(findStart(data)).toEqual([0, 1]);
  });

  test('getNextSteps', () => {
    expect(getNextSteps(data, [[3, 11]])).toEqual([
      [3, 12],
      [4, 11],
    ]);
    expect(getNextSteps(data, [[1, 2], [1,3]])).toEqual([
      [1, 4],
    ]);
    expect(getNextSteps(data, [[4, 3]])).toEqual([
      [5, 3],
    ]);
  });

  describe('Part 1', () => {
    test('solve', () => {
      expect(solve1(sample)).toBe(94);
    });
  });
});
