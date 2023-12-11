const lines = require('fs').readFileSync(process.argv[2]).toString().split("\n").filter(x => x);
const getNums = str => str.match(/\d+/g).map(n => Number(n));
const zip = (a, b) => a.map((x, i) => [ x, b[i] ]);
const times = getNums(lines.shift());
const distances = getNums(lines.shift());
const pairs = zip(times, distances);

const result = pairs.reduce((acc, [time, distance]) => {
  let ways = 0;
  for (let i = 1; i < time; i++) {
    if ((time - i) * i > distance) {
      ways++;
    } else if (ways) {
      break;
    }
  }
  return acc * ways;
}, 1);

console.log(result);
