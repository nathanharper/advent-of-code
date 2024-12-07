import { readFileSync } from 'fs';

export function callWithInputFile(func) {
  if (process.argv[2]) {
    return func(readFileSync(process.argv[2]).toString());
  }
}
