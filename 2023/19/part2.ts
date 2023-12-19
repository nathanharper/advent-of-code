import { readFileSync } from 'fs';
import { processInput } from './util';

type RatingKey = 'x' | 'm' | 'a' | 's';
type Ranges = {
  [key in RatingKey]: [number, number];
};

export function calcScoreFromRanges(ranges: Ranges): number {
  let sum = 0;
  const {x,m,a,s} = ranges;
  const dx = x[1] - x[0] + 1;
  const dm = m[1] - m[0] + 1;
  const da = a[1] - a[0] + 1;
  const ds = s[1] - s[0] + 1;
  for (let ix = x[0]; ix <= x[1]; ix++) sum += ix * dm * da * ds;
  for (let im = m[0]; im <= m[1]; im++) sum += im * dx * da * ds;
  for (let ia = a[0]; ia <= a[1]; ia++) sum += ia * dx * dm * ds;
  for (let is = s[0]; is <= s[1]; is++) sum += is * dx * dm * da;
  return sum;
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

export function solveWorkflow(key: String, workflows, rs: Ranges): number {
    console.log(key, rs);
  if (key === 'R') return 0;
  if (key === 'A') {
    return calcScoreFromRanges(rs);
  }

  const wf = workflows[key];
  let sum = 0;
  const ranges = JSON.parse(JSON.stringify(rs)); // clone
  for (let i = 0; i < wf.length; i++) {
    const [rule, dest] = wf[i];
    if (!dest) { // we hit the fallback
      sum += solveWorkflow(rule, workflows, ranges);
      break;
    }
    const [,rk,oper,compStr] = rule.match(ruleRegex);
    const [hitRange, missRange] = getAdjustedRange(ranges[rk], oper, Number(compStr));
    if (hitRange) {
      sum += solveWorkflow(dest, workflows, {...ranges, [rk]: hitRange});
    }
    if (!missRange) break; // we've hit a situation where we can't satisfy the miss condition, so this is a dead path
    ranges[rk] = missRange;
  }
  return sum;
}

export default function solve(input: String): number {
  const [workflows] = processInput(input);
  return solveWorkflow('in', workflows, {
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
