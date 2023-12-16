import { readFileSync } from 'fs';
import { BeamField } from './util';

function getStartingIndices(width: number, height: number): [number, number][] {
  return [
    ...Array(width).fill(0).map((_, i) => ([-1, i])), // north
    ...Array(width).fill(0).map((_, i) => ([height, i])), // south
    ...Array(height).fill(0).map((_, i) => ([i, -1])), // west
    ...Array(height).fill(0).map((_, i) => ([i, width])), // east
  ];
}

export default function solve(input: String): number {
  const field = new BeamField(input);
  const width = field.getWidth();
  const height = field.getHeight();

  return getStartingIndices(width, height).reduce((max, start) => {
    field.reset();
    const next = start.map((x, i) => {
      if ((i === 0 && x === height) || (i === 1 && x === width)) return x - 1;
      return Math.max(x, 0);
    });
    field.energize(start, next);
    return Math.max(max, field.totalEnergizedTiles());
  }, 0);
}

if (process.argv[2]) {
  const input = readFileSync(process.argv[2]).toString();
  console.log(solve(input));
}
