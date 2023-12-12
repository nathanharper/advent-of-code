import { readFileSync } from 'fs';
import { collectPipeline, processData } from './util';

export default function solver(data: String): number {
  const pipeline = collectPipeline(processData(data));
  return Math.floor(pipeline.length / 2);
}

if (process.argv[2]) {
  console.log(solver(readFileSync(process.argv[2]).toString()));
}
