import { callWithInputFile } from '../util';
import {
  createReorderFunc,
  getMiddleNumber,
  obeysRule,
  processInput,
} from './shared';

export function solve(rules: [number,number][], lists: number[][]): number {
  const reorder = createReorderFunc(rules);
  return lists.reduce((sum, l) => {
    if (!rules.every(r => obeysRule(l, r))) {
      sum += getMiddleNumber(reorder(l));
    }
    return sum;
  }, 0);
}

callWithInputFile(input => {
  const { rules, lists } = processInput(input);
  console.log(solve(rules, lists));
});
