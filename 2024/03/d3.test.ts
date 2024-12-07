import { describe, test, expect } from 'bun:test';
import { solve as solve1 } from './part1';
import { solve as solve2 } from './part2';

const input = `
xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
`.trim();

const input2 = `
xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))
`.trim();

describe('Day 3', () => {
  describe('Part 1', () => {
    test('solve', () => {
      expect(solve1(input)).toBe(161);
    });
  });

  describe('Part 2', () => {
    test('solve', () => {
      expect(solve2(input2)).toBe(48);
    });
  });
});
