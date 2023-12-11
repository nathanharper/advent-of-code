import { readFileSync } from 'fs';
import {
  collectPipeline,
  processData,
  isPosEqual,
  getTileTransforms,
  IntTuple,
  hasPos,
} from './util';

type FindConnectedNodesResponse = {
  nodes: IntTuple[];
  isInside: boolean;
}

export class Piper {
  private map: String[] = null;
  private pipeline: IntTuple[] = null;
  private connections: int[][] = null;

  constructor(data) {
    this.map = processData(data);
    this.pipeline = collectPipeline(this.map);
    this.connections = this.getConnectionMatrix();
  }

  getConnectionMatrix(): int[][] {
    // construct an empty matrix
    const width = this.map[0].length;
    const matrix = [];
    for (let i = 0; i < this.map.length; i++) {
      matrix.push(Array(width - 1).fill(0));
      if (i < this.map.length - 1) {
        matrix.push(Array(width).fill(0));
      }
    }

    this.pipeline.forEach((pos): void => {
      const [y, x] = pos;
      getTileTransforms(this.map, pos)?.forEach(([dy,dx]): void => {
        const row = (2 * y) + dy;
        const col = dx > 0 ? x : x + dx;
        matrix[row][col] = 1;
      });
    });

    return matrix;
  }

  isEdgeNode(pos: IntTuple): boolean {
    const [y, x] = pos;
    return y === 0 || y === this.map.length - 1 || x === 0 || x === this.map[0].length - 1;
  }

  getFillCount(): int {
    return -1;
  }

  isConnected(a: IntTuple, b: IntTuple): boolean {
    return false;
  }

  findConnectedNodes(pos: IntTuple): FindConnectedNodesResponse {
    const { map, pipeline, connections } = this;
    if (hasPos(pipeline, pos)) {
      return {
        nodes: [],
        isInside: false,
      };
    }
    const connected = {
    };
    if (this.isEdgeNode(map, pos)) {
      return true;
    }
    return false;

    const [posy, posx] = pos;
    for (let y = posy - 1; y < posy + 2; y++) {
      if (y < 0 || y >= map.length) continue;
      for (let x = posx - 1; x < posx + 2; x++) {
        if (x < 0 || x >= map[0].length) continue;
      }
    }
  }
}

export default function solver(data: String): int {
  return new Piper(data).getFillCount();
}

function visualize(data: String): void {
  const piper = new Piper(data);
  const reset = "\x1b[0m";
  const green = "\x1b[32m";
  for (let y = 0; y < piper.map.length; y++) {
    const row = piper.map[y];
    for (let x = 0; x < row.length; x++) {
      const char = row[x];
      const currPos = [y, x];
      const isPipeline = piper.pipeline.some(pos => isPosEqual(pos, currPos));
      process.stdout.write(isPipeline ? `${green}${char}${reset}` : char);
    }
    process.stdout.write("\n");
  }
}

if (process.argv[2]) {
  const contents = readFileSync(process.argv[2]).toString();
  if (process.argv[3] === '-v') {
    visualize(contents);
  } else {
    console.log(solver(contents));
  }
}
