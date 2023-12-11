import { readFileSync } from 'fs';

export default function solver(data: String): int {
  return -1;
}

if (process.argv[2]) {
  const data = readFileSync(process.argv[2]).toString();
  console.log(solve(data));
}
