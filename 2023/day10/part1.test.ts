import { test, expect, describe, beforeAll } from 'bun:test';
import p1Solver, {
  getTileTransforms,
  processData,
  findVarmintPosition,
  collectPipeline,
  isPosEqual,
  getConnectedTiles,
} from './part1';

const sample1 = `.....
.S-7.
.|.|.
.L-J.
.....`;

const sample2 = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;

function hasPos(data: [int, int][], pos: [int, int]): boolean {
  return Boolean(data.find((thisPos) => {
    return isPosEqual(pos, thisPos);
  }));
}

describe('Day 10', () => {
  describe('Part 1', () => {
    let data1, data2;
    beforeAll(() => {
      data1 = processData(sample1);
      data2 = processData(sample2);
    });

    test('Processes data into rows', () => {
      expect(data1.length).toBe(5);
      expect(data1[0]).toEqual('.....');
      expect(data1[1]).toEqual('.S-7.');
      expect(data1[2]).toEqual('.|.|.');
      expect(data1[3]).toEqual('.L-J.');
      expect(data1[4]).toEqual('.....');
    });

    test('Finds the varmint position', () => {
      const pos = findVarmintPosition(data1);
      expect(pos).toEqual([1, 1]);
    });

    test('Determines position equivalency', () => {
      expect(isPosEqual([1,0], [1,-1])).toBeFalse();
      expect(isPosEqual([0,1], [1,0])).toBeFalse();
      expect(isPosEqual([1,0], [1,0])).toBeTrue();
    });

    test('Gets a transform array from a map position', () => {
      expect(getTileTransforms(data1, [1, 2])).toEqual([ [ 0, -1], [ 0,  1] ]);
      expect(getTileTransforms(data1, [1, 0])).toBeNull();
      expect(getTileTransforms(data1, [1, 1])).toBeNull();
    });

    test('Finds tiles connected to a position', () => {
      const answer = getConnectedTiles(data1, [1,1]);
      expect(answer.length).toBe(2);
      expect(hasPos(answer, [1,2])).toBeTrue();
      expect(hasPos(answer, [2,1])).toBeTrue();
    });

    test('Collects all tile positions in the pipeline.', () => {
      const coll = collectPipeline(data1);
      expect(coll.length).toBe(8);
      expect(hasPos(coll, [1,1])).toBeTrue();
      expect(hasPos(coll, [1,2])).toBeTrue();
      expect(hasPos(coll, [1,3])).toBeTrue();
      expect(hasPos(coll, [2,1])).toBeTrue();
      expect(hasPos(coll, [2,3])).toBeTrue();
      expect(hasPos(coll, [3,1])).toBeTrue();
      expect(hasPos(coll, [3,2])).toBeTrue();
      expect(hasPos(coll, [3,3])).toBeTrue();
    });

    test('Solves samples', () => {
      const solution1 = p1Solver(sample1);
      const solution2 = p1Solver(sample2);
      expect(solution1).toBe(4);
      expect(solution2).toBe(8);
    });
  });
});
