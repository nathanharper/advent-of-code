export function processInput(input: string): number[][] {
  return input.trim().split("\n").map(row => {
    return row.split(' ').map(n => parseInt(n, 10));
  });
}

export function isReportSafe(list: number[]): boolean {
  let direction = 0;
  for (let i = 1; i < list.length; i++) {
    const diff = list[i] - list[i - 1];
    const absDiff = Math.abs(diff);
    if (diff === 0 || absDiff > 3) {
      return false;
    }
    const newDir = diff / absDiff;
    if (direction !== 0 && newDir !== direction) {
      // direction changed. something is amiss
      return false;
    }
    direction = newDir;
  }
  return true;
}
