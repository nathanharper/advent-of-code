import { beforeEach, describe, expect, test } from 'bun:test';
import solve1 from './part1';
import { Machine } from './util';

const sample1 = `
broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a
`.trim();

const sample2 = `
broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output
`.trim();

describe('Day 20', () => {
  let mach1, mach2;
  beforeEach(() => {
    mach1 = new Machine(sample1);
    mach2 = new Machine(sample2);
  });

  describe('processInput', () => {
    test('processes input into data structure', () => {
      expect(mach1.data.broadcaster).toEqual({
        type: 'broadcaster',
        outputs: ['a', 'b', 'c'],
      });
      expect(mach1.data.a).toEqual({
        type: '%',
        state: false,
        outputs: ['b'],
      });
      expect(mach1.data.inv).toEqual({
        type: '&',
        state: { c: 0 },
        outputs: ['a'],
      });
    });
  });

  describe('charge', () => {
    test('count low and high pulses across cycles', () => {
      for (let i = 1; i <= 1000; i++) {
        mach1.cycle();
        mach2.cycle();
      }
      expect(mach1.pulseCounts[0]).toBe(8000);
      expect(mach1.pulseCounts[1]).toBe(4000);
      expect(mach2.pulseCounts[0]).toBe(4250);
      expect(mach2.pulseCounts[1]).toBe(2750);
    });
  });

  describe('Part 1', () => {
    test('solve', () => {
      expect(solve1(sample1, 1000)).toBe(32000000);
      expect(solve1(sample2, 1000)).toBe(11687500);
    });
  });
});
