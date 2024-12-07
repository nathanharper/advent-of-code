import { readFileSync } from 'fs';
import {
  calcDiff,
  processInput,
  sortAsc,
} from './shared';

const input = processInput(readFileSync(process.argv[2]).toString());
console.log(calcDiff(...input.map(sortAsc)));
