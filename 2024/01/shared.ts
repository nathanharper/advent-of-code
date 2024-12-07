export function processInput(input: string): [number[], number[]] {
  return input.trim().split("\n").reduce((acc, line) => {
    const [a, b] = line.split(/\s+/);
    acc[0].push(parseInt(a, 10));
    acc[1].push(parseInt(b, 10));
    return acc;
  }, [[], []]);
}

export function sortAsc(input: number[]): number[] {
  return input.sort((a, b) => a - b);
}

export function calcDiff(a: number[], b: number[]): number {
  return a.reduce((acc, n, i) => {
    return acc + Math.abs(n - b[i]);
  }, 0);
}

export function countOccurrences(list: number[]): Map {
  return list.reduce((acc, n) => {
    if (acc.has(n)) {
      acc.set(n, acc.get(n) + 1);
    } else {
      acc.set(n, 1);
    }
    return acc;
  }, new Map());
}

export function calcSimilarity(a: number[], b: number[]): number {
  const map = countOccurrences(b);
  return a.reduce((acc, n) => {
    const mult = map.has(n) ? map.get(n) : 0;
    return acc + (n * mult);
  }, 0);
}
