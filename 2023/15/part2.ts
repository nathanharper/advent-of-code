import { readFileSync } from 'fs';
import { hash, processData } from './util';

type Lens = [String, number];
type Box = Lens[];

export function performBoxOp(input: String, boxes: Lens[][]): Lens[][] {
  const [label, focalLengthStr] = input.split(/[=-]/);
  const boxIdx = hash(label);

  if (focalLengthStr) { // add to box
    const lens = [label, Number(focalLengthStr)];
    boxes[boxIdx] ||= [];
    const labelIndex = boxes[boxIdx].findIndex(b => b[0] === label);
    if (labelIndex >= 0) {
      boxes[boxIdx][labelIndex] = lens;
    } else {
      boxes[boxIdx].push(lens);
    }
  } else if (boxes[boxIdx]) { // remove from box
    boxes[boxIdx] = boxes[boxIdx].filter(x => x[0] !== label);
    if (boxes[boxIdx].length === 0) {
      delete boxes[boxIdx];
    }
  }
  return boxes;
}

export function calcFocusPower(lens: Lens, position: number): number {
  return (hash(lens[0]) + 1) * (position + 1) * lens[1];
}

export function calcBoxTotal(box?: Box): number {
  if (!box) return 0;
  return box.reduce((sum, lens, i) => {
    return sum + calcFocusPower(lens, i);
  }, 0);
}

export default function solve(input: String): number {
  const boxes = processData(input).reduce((acc, str) => {
    return performBoxOp(str, acc);
  }, []);
  return boxes.reduce((sum, box) => {
    return sum + calcBoxTotal(box);
  }, 0);
}

if (process.argv[2]) {
  const input = readFileSync(process.argv[2]).toString();
  console.log(solve(input));
}
