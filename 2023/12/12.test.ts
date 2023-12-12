import { expect, describe, test } from 'bun:test';
import {
  countRowArrangements,
  findFirstPosition,
  structureData,
} from './util';
import solve from './part1';

const sample1 = `
???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1
`.trim();

describe('Day 12', () => {
  describe('structureData', () => {
    test('parse data string into a list of [spring configuration and list of groups]', () => {
      const data = structureData(sample1);
      expect(data[0]).toEqual([
        '???.###',
        [1,1,3],
      ]);
      expect(data[data.length - 1]).toEqual([
        '?###????????',
        [3,2,1],
      ]);
    });
  });

  describe('findFirstPosition', () => {
    test('given a spring string and a length, find the index of the first possible position', () => {
      expect(findFirstPosition('.??..??...?##.', 1)).toBe(1);
      expect(findFirstPosition('.??..??...?##.', 2)).toBe(1);
      expect(findFirstPosition('.??..??...?##.', 3)).toBe(10);
      expect(findFirstPosition('.??..??...?##.', 4)).toBe(-1);
      expect(findFirstPosition('#.??..??...?##.', 2)).toBe(-1);
    });
  });

  describe('countRowArrangements', () => {
    test('given a spring string and a group list, count possible arrangements', () => {
      expect(countRowArrangements('???.###',[1,1,3])).toBe(1);
      expect(countRowArrangements('.??..??...?##.',[1,1,3])).toBe(4);
      expect(countRowArrangements('?#?#?#?#?#?#?#?',[1,3,1,6])).toBe(1);
      expect(countRowArrangements('????.#...#...',[4,1,1])).toBe(1);
      expect(countRowArrangements('????.######..#####.',[1,6,5])).toBe(4);
      expect(countRowArrangements('?###????????',[3,2,1])).toBe(10);
    });
  });

  describe('solve', () => {
    test('given a multiline data string, return the sum of all possible configurations', () => {
      expect(solve(sample1)).toBe(21);
    });
  });
});
