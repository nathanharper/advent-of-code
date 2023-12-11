import { test, expect, describe, beforeAll } from 'bun:test';
import {
  getTileTransforms,
  processData,
  findVarmintPosition,
  collectPipeline,
  isPosEqual,
  getConnectedTiles,
  hasPos,
} from './util';
import p1Solver from './part1';
import p2Solver, { Piper } from './part2';

const sample1 = `
.....
.S-7.
.|.|.
.L-J.
.....
`;

const sample2 = `
..F7.
.FJ|.
SJ.L7
|F--J
LJ...
`;

const sample3 = `
...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
........... 
`;

const sample4 = `
..........
.S------7.
.|F----7|.
.||....||.
.||....||.
.|L-7F-J|.
.|..||..|.
.L--JL--J.
..........
`;

const sample5 = `
.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...
`;

const sample6 = `
FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L
`;

describe('Day 10', () => {
  describe('Utilities', () => {
    let data1;
    beforeAll(() => {
      data1 = processData(sample1);
    });

    test('Tests if a position array has a position', () => {
      const dataSet = [[1,2],[2,1]];
      expect(hasPos(dataSet, [2,1])).toBeTrue();
      expect(hasPos(dataSet, [2,3])).toBeFalse();
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
  });

  describe('Part 1', () => {
    test('Solves samples', () => {
      const solution1 = p1Solver(sample1);
      const solution2 = p1Solver(sample2);
      expect(solution1).toBe(4);
      expect(solution2).toBe(8);
    });
  });

  describe('Part 2', () => {
    let piper1;
    beforeAll(() => {
      piper1 = new Piper(sample1);
    });

    test('Create a two dimensional array of pipe connections', () => {
      expect(piper1.connections.length).toBe(piper1.map.length * 2 - 1);
      expect(piper1.connections).toEqual([
        [0,0,0,0],
        [0,0,0,0,0],
        [0,1,1,0],
        [0,1,0,1,0],
        [0,0,0,0],
        [0,1,0,1,0],
        [0,1,1,0],
        [0,0,0,0,0],
        [0,0,0,0],
      ]);
    });

    test('Determines if a position is an edge node', () => {
      expect(piper1.isEdgeNode([0,4])).toBeTrue();
      expect(piper1.isEdgeNode([0,3])).toBeTrue();
      expect(piper1.isEdgeNode([1,3])).toBeFalse();
      expect(piper1.isEdgeNode([1,4])).toBeTrue();
      expect(piper1.isEdgeNode([3, 0])).toBeTrue();
      expect(piper1.isEdgeNode([3, 2])).toBeFalse();
      expect(piper1.isEdgeNode([4, 4])).toBeTrue();
      expect(piper1.isEdgeNode([4, 2])).toBeTrue();
    });

    test('Finds nodes connected to a supplied node and determines if they are enclosed', () => {
      expect(piper1.findConnectedNodes([2, 0]).isInside).toBeFalse();
      expect(piper1.findConnectedNodes([2, 2])).toEqual({
        node: [[2,2]],
        isInside: true,
      });
    });

    test('Solves samples', () => {
      expect(p2Solver(sample1)).toBe(1);
      expect(p2Solver(sample2)).toBe(1);
      expect(p2Solver(sample3)).toBe(4);
      expect(p2Solver(sample4)).toBe(4);
      expect(p2Solver(sample5)).toBe(8);
      expect(p2Solver(sample6)).toBe(10);
    });
  });
});
