import { describe, expect, test, beforeAll } from 'bun:test';
import {
  evaluateRatings,
  getRatingsScore,
  processInput,
} from './util';
import solve1 from './part1';
import solve2 from './part2';

const sample1 = `
px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}
`.trim();

describe('Day 19', () => {
  let data1;
  beforeAll(() => {
    data1 = processInput(sample1);
  });

  describe('processInput', () => {
    test('parse workflows and ratings', () => {
      const [workflows, ratings] = data1;
      expect(workflows.in).toEqual([['s<1351', 'px'], ['qqz']]);
      expect(workflows.rfg).toEqual([['s<537', 'gd'], ['x>2440', 'R'], ['A']]);
      expect(ratings[0]).toEqual({x:787,m:2655,a:1222,s:2876});
    });
  });

  describe('evaluateRatings', () => {
    test('evaluate whether a rating group is accepted or rejected', () => {
      const [workflows] = data1;
      expect(evaluateRatings({x:787,m:2655,a:1222,s:2876}, workflows, 'in')).toBeTrue()
      expect(evaluateRatings({x:1679,m:44,a:2067,s:496}, workflows, 'in')).toBeFalse();
      expect(evaluateRatings({x:2036,m:264,a:79,s:2244}, workflows, 'in')).toBeTrue();
      expect(evaluateRatings({x:2461,m:1339,a:466,s:291}, workflows, 'in')).toBeFalse();
      expect(evaluateRatings({x:2127,m:1623,a:2188,s:1013}, workflows, 'in')).toBeTrue();
    });
  });

  describe('getRatingsScore', () => {
    test('sum the values of all ratings', () => {
      expect(getRatingsScore({x:787,m:2655,a:1222,s:2876})).toBe(7540);
    });
  });

  describe('Part 1', () => {
    test('solve', () => {
      expect(solve1(sample1)).toBe(19114);
    });
  });

  describe('Part 2', () => {
    test('solve', () => {
      expect(solve2(sample1)).toBe(167409079868000);
    });
  });
});
