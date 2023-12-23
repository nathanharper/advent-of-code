const PATH = '.';
const FOREST = '#';
const UP = '^';
const RIGHT = '>';
const DOWN = 'v';
const LEFT = '<';
type Pos = [number, number];
type Tile = PATH | FOREST | UP | RIGHT | DOWN | LEFT;

export function processInput(input: string): string[] {
  return input.split('\n').filter(x => x);
}

export function findStart(data: string[]): Pos {
  const x = data[0].indexOf(PATH);
  return [0, x];
}

const transforms = [ [-1, 0], [0, 1], [1, 0], [0, -1] ];

function addPositions(a: Pos, b: Pos): Pos {
  return a.map((x, i) => x + b[i]);
}

function isInBounds(pos: Pos, data: string[]): boolean {
  const [y, x] = pos;
  return y >= 0 && y < data.length && x >= 0 && x < data[0].length;
}

function getTile(pos: Pos, data: string[]): Tile {
  const [y,x] = pos;
  return data[y][x];
}

function hasPos(traveled: Pos[], pos: Pos): boolean {
  return !!traveled.find(([y,x]) => y === pos[0] && x === pos[1]);
}

export function getNextSteps(data: string[], traveled: Pos[]): Pos[] {
  const pos = traveled[traveled.length - 1];
  const thisTile = getTile(pos, data);
  return transforms.reduce((acc, tr, i) => {
    switch (thisTile) {
      case UP:
        if (tr[0] !== -1) return acc;
        break;
      case DOWN:
        if (tr[0] !== 1) return acc;
        break;
      case LEFT:
        if (tr[1] !== -1) return acc;
        break;
      case RIGHT:
        if (tr[1] !== 1) return acc;
        break;
      default:
        break;
    }
    const newPos = addPositions(pos, tr);
    if (!isInBounds(newPos, data) || hasPos(traveled, newPos)) return acc;
    switch (getTile(newPos, data)) {
      case PATH:
        acc.push(newPos);
        break;
      case UP:
        if (pos[0] >= newPos[0]) acc.push(newPos);
        break;
      case DOWN:
        if (pos[0] <= newPos[0]) acc.push(newPos);
        break;
      case RIGHT:
        if (pos[1] <= newPos[1]) acc.push(newPos);
        break;
      case LEFT:
        if (pos[1] >= newPos[1]) acc.push(newPos);
        break;
      default:
        break;
    }
    return acc;
  }, []);
}
