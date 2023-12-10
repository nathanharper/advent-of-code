import { readFileSync } from 'fs';
import { test, expect } from 'bun:test';
import p2Solver from './part2';

test('Solves Day 9 Part 2 sample data.', () => {
  const solution = p2Solver(readFileSync('./sample.txt').toString());
  expect(solution).toBe(2);
});
