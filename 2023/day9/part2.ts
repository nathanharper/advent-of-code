import { readFileSync } from 'fs';

function parseInput(data: String): int[][] {
  return data.split("\n").filter(x => x).map(line => {
    return line.split(' ').map(s => Number(s));
  });
}

function getNextSequence(seq: int[]): int[] {
  const next = [];
  for (let i = 0; i < seq.length - 1; i++) {
    next.push(seq[i + 1] - seq[i]);
  }
  return next;
}

function getAllSequences(seq: int[]): int[][] {
  const seqList = [seq];
  while (!seqList[0].every(x => x === 0)) {
    seqList.unshift(getNextSequence(seqList[0]));
  }
  return seqList;
}

function extrapolateSequence(seq: int[]): int {
  const sequences = getAllSequences(seq);
  return sequences.reduce((acc, [first]): int => {
    return first - acc;
  }, sequences.shift()[0]);
}

export default function solver(data: String): int {
  return parseInput(data).reduce((acc, h): int => {
    return acc + extrapolateSequence(h);
  }, 0);
}

if (process.argv[2]) {
  console.log(solver(readFileSync(process.argv[2]).toString()));
}
