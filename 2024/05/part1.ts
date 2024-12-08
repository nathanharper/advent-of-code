import { callWithInputFile } from '../util';
import {
  getMiddleNumber,
  obeysRule,
  processInput,
} from './shared';

export function solve(rules: [number,number][], lists: number[][]): number {
  return lists.reduce((sum, l) => {
    if (rules.every(r => obeysRule(l, r))) {
      sum += getMiddleNumber(l);
    }
    return sum;
  }, 0);
}

callWithInputFile(input => {
  const { rules, lists } = processInput(input);
  console.log(solve(rules, lists));
});
