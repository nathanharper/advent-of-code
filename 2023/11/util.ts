type IntTuple = [number, number];

export function processData(data: String): String[] {
  return data.split("\n").filter(x => x);
}

export function collectAllGalaxies(map: String[]): IntTuple[] {
  const galaxies = [];
  for (let r = 0; r < map.length; r++) {
    for (let c = 0; c < map[0].length; c++) {
      if (map[r][c] === '#') {
        galaxies.push([r, c]);
      }
    }
  }
  return galaxies;
}

function numSort(a, b) {
  return a - b;
}

export function findGalaxyDistance(
  a: IntTuple,
  b: IntTuple,
  expandedRows: number[],
  expandedCols: number[],
  multiplier: number
): number {
  return a.reduce((sum, x, i): number => {
    const idxs = [x, b[i]].sort(numSort);
    const diff = idxs[1] - idxs[0];
    if (diff === 0) return sum;
    const expanded = i === 0 ? expandedRows : expandedCols;
    return sum + expanded.reduce((acc, r): number => {
      if (r > idxs[0] && r < idxs[1]) {
        acc += multiplier - 1;
      }
      return acc;
    }, diff);
  }, 0);
}

export function findExpandedRows(map: String[]): number[] {
  return map.reduce((acc, row, index) => {
    if (row.indexOf('#') < 0) {
      acc.push(index);
    }
    return acc;
  }, []);
}

export function findExpandedCols(map: String[]): number[] {
  const cols = [];

  for (let c = 0; c < map[0].length; c++) {
    let isEmpty = true;
    for (let r = 0; r < map.length; r++) {
      if (map[r][c] === '#') {
        isEmpty = false;
        break;
      }
    }
    if (isEmpty) {
      cols.push(c);
    }
  }
  return cols;
}
