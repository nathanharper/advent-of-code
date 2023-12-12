import { readFileSync } from 'fs';
import {
  processData,
  collectAllGalaxies,
  findExpandedCols,
  findExpandedRows,
  findGalaxyDistance,
} from './util';

export default function solve(data: String, multiplier: number): number {
  const map = processData(data);
  const galaxies = collectAllGalaxies(map);
  const rows = findExpandedRows(map);
  const cols = findExpandedCols(map);
  return galaxies.reduce((sum, g, i) => {
    for (let x = i + 1; x < galaxies.length; x++) {
      sum += findGalaxyDistance(g, galaxies[x], rows, cols, multiplier);
    }
    return sum;
  }, 0);
}

if (process.argv.length > 3) {
  const data = readFileSync(process.argv[2]).toString();
  console.log(solve(data, Number(process.argv[3])));
}
