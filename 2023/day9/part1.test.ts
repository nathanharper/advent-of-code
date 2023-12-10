import { readFileSync } from 'fs';
import { test, expect } from 'bun:test';
import p1Solver from './part1';

test('Solves Day 9 Part 1 sample data.', () => {
  const solution = p1Solver(readFileSync('./sample.txt').toString());
  expect(solution).toBe(114);
});
