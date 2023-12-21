type Pos = [number, number];

const START = 'S';
const EMPTY = '.';

export function processInput(input: string): string[] {
  return input.split('\n').filter(x => x);
}

export function findStart(data: string[]): Pos {
  for (let y = 0; y < data.length; y++) {
    const x = data[y].indexOf(START);
    if (x >= 0) {
      return [y, x];
    }
  }
  throw new Error('buh?!');
}

const posChecks = [
  [-1,  0],
  [ 0,  1],
  [ 1,  0],
  [ 0, -1],
];

export function getNextSteps(data: string[], pos: Pos): Pos[] {
  return posChecks.reduce((acc, diff) => {
    const step: Pos = [pos[0] + diff[0], pos[1] + diff[1]];
    const tile = data[step[0]]?.[step[1]];
    if (tile === EMPTY || tile === START) acc.push(step);
    return acc;
  }, []);
}
