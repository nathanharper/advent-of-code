import { describe, test, expect } from 'bun:test';
import {
  hash,
  processData,
} from './util';
import solve1 from './part1';
import solve2, {
  calcBoxTotal,
  calcFocusPower,
  performBoxOp,
} from './part2';

const sample1 = 'rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7';
const sample2 = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,
ab=5,pc-,pc=6,ot=7`;

describe('Day 15', () => {
  test('processData', () => {
    expect(processData(sample2)).toEqual([ 'rn=1','cm-','qp=3','cm=2','qp-','pc=4','ot=9','ab=5','pc-','pc=6','ot=7']);
  });

  test('hash', () => {
    expect(hash('rn=1')).toBe(30);
    expect(hash('cm-')).toBe(253);
    expect(hash('qp=3')).toBe(97);
    expect(hash('cm=2')).toBe(47);
    expect(hash('qp-')).toBe(14);
    expect(hash('pc=4')).toBe(180);
    expect(hash('ot=9')).toBe(9);
    expect(hash('ab=5')).toBe(197);
    expect(hash('pc-')).toBe(48);
    expect(hash('pc=6')).toBe(214);
    expect(hash('ot=7')).toBe(231);
  });

  test('performBoxOp', () => {
    let curr = performBoxOp('rn=1', []);
    expect(curr).toEqual([[['rn', 1]]]);
    curr = performBoxOp('cm-', curr);
    expect(curr).toEqual([[['rn', 1]]]);
    curr = performBoxOp('qp=3', curr);
    expect(curr).toEqual([
      [['rn', 1]],
      [['qp', 3]],
    ]);
    curr = performBoxOp('cm=2', curr);
    expect(curr).toEqual([
      [['rn', 1], ['cm', 2]],
      [['qp', 3]],
    ]);
    curr = performBoxOp('qp-', curr);
    expect(curr).toEqual([
      [['rn', 1], ['cm', 2]],
    ]);
    curr = performBoxOp('pc=4', curr);
    expect(curr).toEqual([
      [['rn', 1], ['cm', 2]],
      undefined,
      undefined,
      [['pc', 4]],
    ]);
    curr = performBoxOp('ot=9', curr);
    expect(curr).toEqual([
      [['rn', 1], ['cm', 2]],
      undefined,
      undefined,
      [['pc', 4], ['ot', 9]],
    ]);
    curr = performBoxOp('ab=5', curr);
    expect(curr).toEqual([
      [['rn', 1], ['cm', 2]],
      undefined,
      undefined,
      [['pc', 4], ['ot', 9], ['ab', 5]],
    ]);
    curr = performBoxOp('pc-', curr);
    expect(curr).toEqual([
      [['rn', 1], ['cm', 2]],
      undefined,
      undefined,
      [['ot', 9], ['ab', 5]],
    ]);
    curr = performBoxOp('pc=6', curr);
    expect(curr).toEqual([
      [['rn', 1], ['cm', 2]],
      undefined,
      undefined,
      [['ot', 9], ['ab', 5], ['pc', 6]],
    ]);
    curr = performBoxOp('ot=7', curr);
    expect(curr).toEqual([
      [['rn', 1], ['cm', 2]],
      undefined,
      undefined,
      [['ot', 7], ['ab', 5], ['pc', 6]],
    ]);
  });

  test('calcFocusPower', () => {
    expect(calcFocusPower(['rn', 1], 0)).toBe(1);
    expect(calcFocusPower(['cm', 2], 1)).toBe(4);
    expect(calcFocusPower(['ot', 7], 0)).toBe(28);
    expect(calcFocusPower(['ab', 5], 1)).toBe(40);
    expect(calcFocusPower(['pc', 6], 2)).toBe(72);
  });

  test('calcBoxTotal', () => {
    expect(calcBoxTotal([['rn', 1], ['cm', 2]])).toBe(5);
    expect(calcBoxTotal([['ot', 7], ['ab', 5], ['pc', 6]])).toBe(140);
  });

  describe('Part 1', () => {
    test('solve', () => {
      expect(solve1(sample1)).toBe(1320);
    });
  });

  describe('Part 2', () => {
    test('solve', () => {
      expect(solve2(sample1)).toBe(145);
    });
  });
});
