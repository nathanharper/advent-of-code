type Pos = [number, number];
type BeamFieldTileType = {
  type: '|' | '-' | '\\' | '/' | '.';
  charge: number;
};
type BeamFieldDataType = BeamFieldTileType[][];

function vectorSub(v1: Pos, v2: Pos): Pos {
  return v1.map((x, i) => x - v2[i]);
}

function vectorAdd(v1: Pos, v2: Pos): Pos {
  return v1.map((x, i) => x + v2[i]);
}

export class BeamField {
  private data;
  private memo = {};

  constructor(input: String) {
    this.data = this.processInput(input);
  }

  reset(): void {
    this.memo = {};
    this.data = this.data.map(row => {
      return row.map(x => ({ ...x, charge: 0 }));
    });
  }

  getWidth(): number {
    return this.data[0].length;
  }

  getHeight(): number {
    return this.data.length;
  }

  processInput(input: String): BeamFieldDataType {
    return input.split("\n").filter(x => x).map(row => {
      return row.split('').map(type => ({ type, charge: 0 }));
    });
  }

  tileAt(y: number, x: number): BeamFieldTileType {
    return this.data[y][x];
  }

  getNextTiles(prev: Pos, curr: Pos): Pos[] {
    const currTile = this.data[curr[0]][curr[1]];
    const d = vectorSub(curr, prev);

    let next;
    switch (currTile.type) {
      case '.':
        next = [vectorAdd(curr, d)];
        break;
      case '-':
        if (d[0] !== 0) { // split
          next = [
            [curr[0], curr[1] - 1],
            [curr[0], curr[1] + 1],
          ];
        } else {
          next = [vectorAdd(curr, d)];
        }
        break;
      case '|':
        if (d[1] !== 0) { // split
          next = [
            [curr[0] - 1, curr[1]],
            [curr[0] + 1, curr[1]],
          ];
        } else {
          next = [vectorAdd(curr, d)];
        }
        break;
      case '/':
        next = d[0] !== 0
          ? [[curr[0], curr[1] - d[0]]] // vertical approach
          : [[curr[0] - d[1], curr[1]]]; // horizontal approach
        break;
      case '\\':
        next = d[0] !== 0
          ? [[curr[0], curr[1] + d[0]]] // vertical approach
          : [[curr[0] + d[1], curr[1]]]; // horizontal approach
        break;
      default:
        throw new Error('buh?!?');
    }

    // filter out of bounds
    return next.filter(([y, x]) => {
      return x >= 0 && x < this.data[0].length && y >= 0 && y < this.data.length;
    });
  }

  totalEnergizedTiles() {
    return this.data.reduce((total, row) => {
      return total + row.filter(x => x.charge > 0).length;
    }, 0);
  }

  energize(prev: Pos = [0,-1], curr: Pos = [0,0]): void {
    const key = [...prev, ...curr].join(',');
    if (this.memo[key]) return;
    this.memo[key] = true;
    this.data[curr[0]][curr[1]].charge++;
    this.getNextTiles(prev, curr).forEach(next => this.energize(curr, next));
    /*
    const stack = [[prevInit, [currInit]]];
    let prev, moves;
    while ([prev, moves] = stack.pop()) {
      console.log(prev, moves)
      moves.forEach(curr => {
        this.data[curr[0]][curr[1]].charge++;
        stack.push([curr, this.getNextTiles(prev, curr)]);
      });
    }
    */
  }
}
