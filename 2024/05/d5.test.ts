import { describe, test, expect } from 'bun:test';
import {
  createReorderFunc,
  getMiddleNumber,
  obeysRule,
  processInput,
} from './shared';
import { solve as solve1 } from './part1';
import { solve as solve2 } from './part2';

const input = `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`.trim();

describe('Day 5', () => {
  describe('processInput', () => {
    test('transforms string input into page ordering rules and pages lists', () => {
      expect(processInput(input)).toEqual({
        rules: [
          [47,53],
          [97,13],
          [97,61],
          [97,47],
          [75,29],
          [61,13],
          [75,53],
          [29,13],
          [97,29],
          [53,29],
          [61,53],
          [97,53],
          [61,29],
          [47,13],
          [75,47],
          [97,75],
          [47,61],
          [75,61],
          [47,29],
          [75,13],
          [53,13],
        ],
        lists: [
          [75,47,61,53,29],
          [97,61,53,29,13],
          [75,29,13],
          [75,97,47,61,53],
          [61,13,29],
          [97,13,75,29,47],
        ],
      });
    });
  });

  describe('obeysRule', () => {
    test('takes a list and a rule and determines if it passes', () => {
      expect(obeysRule([75,47,61,53,29], [75,47])).toBe(true);
      expect(obeysRule([75,97,47,61,53], [97,75])).toBe(false);
      expect(obeysRule([75,97,47,61,53], [69,75])).toBe(true);
    });
  });

  describe('getMiddleNumber', () => {
    test('returns the middle number of the provided list', () => {
      expect(getMiddleNumber([75,47,61,53,29])).toBe(61);
      expect(getMiddleNumber([97,61,53,29,13])).toBe(53);
      expect(getMiddleNumber([75,29,13])).toBe(29);
    });
  });

  describe('createReorderFunc', () => {
    test('given a set of rules, creates a function sorts a list into the correct order', () => {
      const { rules } = processInput(input);
      const reorder = createReorderFunc(rules);
      expect(reorder([75,97,47,61,53])).toEqual([97,75,47,61,53]);
      expect(reorder([61,13,29])).toEqual([61,29,13]);
      expect(reorder([97,13,75,29,47])).toEqual([97,75,47,29,13]);
    });
  });

  describe('Part 1', () => {
    test('solve', () => {
      const { rules, lists } = processInput(input);
      expect(solve1(rules, lists)).toBe(143);
    });
  });

  describe('Part 2', () => {
    test('solve', () => {
      const { rules, lists } = processInput(input);
      expect(solve2(rules, lists)).toBe(123);
    });
  });
});
