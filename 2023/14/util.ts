const round = 'O';
const square = '#';
const empty = '.';

export function rotate(arr: String[]): String[] {
  const rotated = Array(arr[0].length).fill([]).map(() => Array(arr.length).fill(0));
  for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr[0].length; x++) {
      rotated[x][arr.length - 1 - y] = arr[y][x];
    }
  }
  return rotated.map(r => r.join(''));
}

export function tilt(row: String): String {
  return row.split(square).map(section => {
    if (!section.length) return section;
    const roundCount = section.split('').filter(s => s === round).length;
    return Array(section.length - roundCount).fill(empty)
      .concat(Array(roundCount).fill(round))
      .join('');
  }).join(square);
}

export function calcRowTotal(row: String): number {
  return tilt(row).split('').reduce((sum, char, i) => {
    if (char === round) return sum + i + 1;
    return sum;
  }, 0);
}
