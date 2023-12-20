import { readFileSync } from 'fs';
import { processInput } from './util';

type RatingKey = 'x' | 'm' | 'a' | 's';
type Ranges = {
  [key in RatingKey]: [number, number];
};

export function calcScoreFromRanges(ranges: Ranges): number {
  const {x,m,a,s} = ranges;
  const dx = x[1] - x[0] + 1;
  const dm = m[1] - m[0] + 1;
  const da = a[1] - a[0] + 1;
  const ds = s[1] - s[0] + 1;
  return dx*dm*da*ds;
}

export function getAdjustedRange(range: [number, number], oper: String, comp: number): [number, number][] {
  let newRange;
  switch (oper) {
    case '>': {
      newRange = [
        [comp+1, range[1]],
        [range[0], comp],
      ];
      break;
    }
    case '<': {
      newRange = [
        [range[0], comp-1],
        [comp, range[1]],
      ];
      break;
    }
    default:
      throw new Error('buh?!');
  }
  newRange = newRange.map(([a, b]) => {
    return b - a < 0 ? null : [a, b];
  });
  return newRange;
}

const ruleRegex = /([xmas])([><])(\d+)/;

export function getRanges(key: String, workflows, ranges: Ranges): number {
  if (key === 'R') return 0;
  if (key === 'A') {
    return calcScoreFromRanges(ranges);
  }

  const wf = workflows[key];
  let sum = 0;
  for (let i = 0; i < wf.length; i++) {
    const [rule, dest] = wf[i];
    if (!dest) { // we hit the fallback
      sum += getRanges(rule, workflows, ranges);
      break;
    }
    const [,rk,oper,compStr] = rule.match(ruleRegex);
    const [hitRange, missRange] = getAdjustedRange(ranges[rk], oper, Number(compStr));
    if (hitRange) {
      sum += getRanges(dest, workflows, {...ranges, [rk]: hitRange});
    }
    if (!missRange) break; // we've hit a situation where we can't satisfy the miss condition, so this is a dead path
    ranges[rk] = missRange;
  }
  return sum;
}

export default function solve(input: String): number {
  const [workflows] = processInput(input);
  return getRanges('in', workflows, {
    x: [1,4000],
    m: [1,4000],
    a: [1,4000],
    s: [1,4000],
  });
}

if (process.argv[2]) {
  const input = readFileSync(process.argv[2]).toString();
  console.log(solve(input));
}
