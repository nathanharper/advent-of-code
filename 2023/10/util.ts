type Tile = '|' | '-' | 'L' | 'J' | '7' | 'F';
type Dir = -1 | 0 | 1;
export type DirTuple = [Dir, Dir];
export type IntTuple = [int, int];
type TileMap = {
  [key in Tile]: [DirTuple, DirTuple];
}

/*
 * Each tile type has two tuples, containing a y and x value, in that order.
 * Adding these values to the current position's indices will yield the connected tile positions.
 */
const tileMap: TileMap = {
  '|': [ [-1,  0], [ 1,  0] ],
  '-': [ [ 0, -1], [ 0,  1] ],
  'L': [ [-1,  0], [ 0,  1] ],
  'J': [ [-1,  0], [ 0, -1] ],
  '7': [ [ 0, -1], [ 1,  0] ],
  'F': [ [ 0,  1], [ 1,  0] ],
};

export function processData(data: String): String[] {
  return data.split("\n").filter(x => x);
}

export function isPosEqual(a: IntTuple, b: IntTuple): boolean {
  return a.every((x, i) => b[i] === x);
}

export function findVarmintPosition(map: String[]): IntTuple {
  for (let y = 0; y < map.length; y++) {
    const x = map[y].indexOf('S');
    if (x > -1) {
      return [y, x];
    }
  }
}

export function hasPos(data: IntTuple[], pos: IntTuple): boolean {
  return Boolean(data.find((thisPos) => {
    return isPosEqual(pos, thisPos);
  }));
}

export function getTileTransforms(map: String[], pos: IntTuple): [DirTuple, DirTuple] | null {
  const char = map[pos[0]][pos[1]];
  return tileMap[char] || null;
}

export function getConnectedTiles(map: String[], pos: IntTuple): IntTuple[] {
  const result = [];
  const adjacentTransforms = [ [-1,0], [1,0], [0,-1], [0,1] ];
  for (let i = 0; i < adjacentTransforms.length; i++) {
    const [dy, dx] = adjacentTransforms[i];
    const newY = pos[0] + dy;
    const newX = pos[1] + dx;
    if (newY < 0 || newY >= map.length || newX < 0 || newX >= map[pos[0]].length) {
      continue; // out of bounds
    }
    const newPos = [newY, newX];
    const isConnected: boolean = getTileTransforms(map, newPos)?.some(([ty, tx]) => {
      return isPosEqual(pos, [newY + ty, newX + tx]);
    }) || false;
    if (isConnected) result.push(newPos);
    if (result.length === 2) break;
  }
  return result;
}

export function collectPipeline(map: String[]): IntTuple[] {
  const vPos = findVarmintPosition(map);
  const vConnections = getConnectedTiles(map, vPos);
  const coll = [vConnections[0], vPos, vConnections[1]];
  while (true) {
    const curr = coll[coll.length - 1];
    const prev = coll[coll.length - 2];
    const transforms = getTileTransforms(map, curr);

    for (let i = 0; i < transforms.length; i++) {
      let [dy, dx] = transforms[i];
      const pos = [curr[0] + dy, curr[1] + dx];
      if (!isPosEqual(pos, prev) && !isPosEqual(pos, coll[0])) {
        coll.push(pos);
      }
    }
    if (isPosEqual(curr, coll[coll.length - 1])) {
      return coll;
    }
  }
}
