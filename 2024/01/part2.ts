import { readFileSync } from 'fs';
import {
  calcSimilarity,
  processInput,
  sortAsc,
} from './shared';

const input = processInput(readFileSync(process.argv[2]).toString());
console.log(calcSimilarity(...input));
