export function processData(str: String): [String[], String[]] {
  return str.split("\n").join(' ').split(/\s{2,}/).map(x => x.split(' '));
}

export function rotate(valley: String[]): String[] {
  const rotated = Array(valley[0].length).fill([]).map(() => Array(valley.length).fill(0));
  for (let y = 0; y < valley.length; y++) {
    for (let x = 0; x < valley[0].length; x++) {
      rotated[x][valley.length - 1 - y] = valley[y][x];
    }
  }

  return rotated.map(row => row.join(''));
}

export function findPivotScore(valley: String[]): number {
  for (let y = 0; y < valley.length - 1; y++) {
    for (let i = 0; i <= y; i++) {
      const r1 = valley[y - i];
      const r2 = valley[y + 1 + i];
      if (r2 && r1 !== r2) break;
      if (y - i === 0) return ++y;
    }
  }
  return 0;
}
