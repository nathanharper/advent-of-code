import { readFileSync } from 'fs';

function parseInput(data: String): number[][] {
  return data.split("\n").filter(x => x).map(line => {
    return line.split(' ').map(s => Number(s));
  });
}

function getNextSequence(seq: number[]): number[] {
  const next = [];
  for (let i = 0; i < seq.length - 1; i++) {
    next.push(seq[i + 1] - seq[i]);
  }
  return next;
}

function getAllSequences(seq: number[]): number[][] {
  const seqList = [seq];
  while (!seqList[0].every(x => x === 0)) {
    seqList.unshift(getNextSequence(seqList[0]));
  }
  return seqList;
}

function extrapolateSequence(seq: number[]): number {
  const sequences = getAllSequences(seq);
  return sequences.reduce((acc, [first]): number => {
    return first - acc;
  }, sequences.shift()[0]);
}

export default function solver(data: String): number {
  return parseInput(data).reduce((acc, h): number => {
    return acc + extrapolateSequence(h);
  }, 0);
}

if (process.argv[2]) {
  console.log(solver(readFileSync(process.argv[2]).toString()));
}
