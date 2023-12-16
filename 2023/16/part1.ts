import { readFileSync } from 'fs';
import { BeamField } from './util';

export default function solve(input: String): number {
  const field = new BeamField(input);
  field.energize();
  return field.totalEnergizedTiles();
}

if (process.argv[2]) {
  const input = readFileSync(process.argv[2]).toString();
  console.log(solve(input));
}
