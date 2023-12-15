import { describe, test, expect } from 'bun:test';
import {
  hash,
  processData,
} from './util';
import solve1 from './part1';

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

  describe('Part 1', () => {
    test('solve', () => {
      expect(solve1(sample1)).toBe(1320);
    });
  });

  describe.skip('Part 2', () => {
    test('solve', () => {
      expect(solve1(sample1)).toBe(1320);
    });
  });
});
