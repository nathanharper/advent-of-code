import { readFileSync } from 'fs';
import { resolve } from 'path';
import { describe, beforeAll, expect, test } from 'bun:test';
import { BeamField } from './util';
import solve1 from './part1';
import solve2 from './part2';

const sample1 = readFileSync(resolve(__dirname, 'sample1.txt')).toString().trim();

describe('Day 16', () => {
  let beamField;
  beforeAll(() => {
    beamField = new BeamField(sample1);
  });

  describe('processInput', () => {
    test('it creates a 2d array of tile data objects', () => {
      const data = beamField.processInput(sample1);
      expect(data.length).toBe(10);
      expect(data[0].length).toBe(10);
      expect(data[0][0]).toEqual({type: '.', charge:0});
      expect(data[9][2]).toEqual({type: '/', charge:0});
    });
  });

  describe('getNextTiles', () => {
    describe('entering a .', () => {
      test('from the west', () => {
        expect(beamField.getNextTiles([0,2], [0,3])).toEqual([[0,4]]);
      });
      test('from the east', () => {
        expect(beamField.getNextTiles([0,4], [0,3])).toEqual([[0,2]]);
      });
      test('from the north', () => {
        expect(beamField.getNextTiles([0,9], [1,9])).toEqual([[2,9]]);
      });
      test('from the south', () => {
        expect(beamField.getNextTiles([2,9], [1,9])).toEqual([[0,9]]);
      });
    });

    describe('entering a |', () => {
      test('from the west', () => {
        expect(beamField.getNextTiles([2,4], [2,5])).toEqual([[1,5], [3,5]]);
      });
      test('from the east', () => {
        expect(beamField.getNextTiles([2,6], [2,5])).toEqual([[1,5], [3,5]]);
      });
      test('from the north', () => {
        expect(beamField.getNextTiles([1,5], [2,5])).toEqual([[3,5]]);
      });
      test('from the south', () => {
        expect(beamField.getNextTiles([3,5], [2,5])).toEqual([[1,5]]);
      });
    });

    describe('entering a -', () => {
      test('from the west', () => {
        expect(beamField.getNextTiles([2,5], [2,6])).toEqual([[2,7]]);
      });
      test('from the east', () => {
        expect(beamField.getNextTiles([2,7], [2,6])).toEqual([[2,5]]);
      });
      test('from the north', () => {
        expect(beamField.getNextTiles([1,6], [2,6])).toEqual([[2,5], [2, 7]]);
      });
      test('from the south', () => {
        expect(beamField.getNextTiles([3,6], [2,6])).toEqual([[2,5], [2,7]]);
      });
    });

    describe('entering a /', () => {
      test('from the west', () => {
        expect(beamField.getNextTiles([6,3], [6,4])).toEqual([[5,4]]);
      });
      test('from the east', () => {
        expect(beamField.getNextTiles([6,5], [6,4])).toEqual([[7,4]]);
      });
      test('from the north', () => {
        expect(beamField.getNextTiles([5,4], [6,4])).toEqual([[6,3]]);
      });
      test('from the south', () => {
        expect(beamField.getNextTiles([7,4], [6,4])).toEqual([[6,5]]);
      });
    });

    describe('entering a \\', () => {
      test('from the west', () => {
        expect(beamField.getNextTiles([1,3], [1,4])).toEqual([[2,4]]);
      });
      test('from the east', () => {
        expect(beamField.getNextTiles([1,5], [1,4])).toEqual([[0,4]]);
      });
      test('from the north', () => {
        expect(beamField.getNextTiles([0,4], [1,4])).toEqual([[1,5]]);
      });
      test('from the south', () => {
        expect(beamField.getNextTiles([2,4], [1,4])).toEqual([[1,3]]);
      });
    });
  });

  describe('energize', () => {
    test('it charges traveled tiles', () => {
      beamField.energize();
      expect(beamField.tileAt(3,1).charge).toBeGreaterThan(0);
      expect(beamField.tileAt(3,2).charge).toBe(0);
    });
  });

  describe('Part 1', () => {
    test('solve', () => {
      expect(solve1(sample1)).toBe(46);
    });
  });

  describe('Part 2', () => {
    test('solve', () => {
      expect(solve2(sample1)).toBe(51);
    });
  });
});
