import { callWithInputFile } from '../util';
import { processInput } from './shared';

const allDirections = [
  [-1,-1],
  [-1,0],
  [-1,1],
  [1,1],
  [1,-1],
  [1,0],
  [0,-1],
  [0,1],
];

export function getXmasCountByPos(data: string[][], x: number, y: number, state = ['X', 'M', 'A', 'S'], direction = null): number {
  const curr = data[y]?.[x];
  if (curr !== state[0]) {
    // return 0 if this item does not match the next char we seek, or it's out of bounds
    return 0;
  }

  const nextState = state.slice(1);
  if (nextState.length === 0) {
    // return 1 if the state is empty, meaning we found a complete match
    return 1;
  }

  const directions = direction ? [direction] : allDirections;
  return directions.reduce((sum, dir) => {
    const [dx, dy] = dir;
    return sum + getXmasCountByPos(data, x + dx, y + dy, nextState, dir);
  }, 0);
}

export function solve(data: string[][], state = ['X','M','A','S']): number {
  let count = 0;
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[0].length; x++) {
      count += getXmasCountByPos(data, x, y);
    }
  }
  return count;
}

console.log(callWithInputFile(x => solve(processInput(x))));
