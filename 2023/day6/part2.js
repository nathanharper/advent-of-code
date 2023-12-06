const lines = require('fs').readFileSync(process.argv[2]).toString().split("\n").filter(x => x);
const getNum = str => str.replace(/\s+/g, '').match(/\d+/g).map(n => Number(n)).shift();
const time = getNum(lines.shift());
const distance = getNum(lines.shift());

let ways = 0;
for (let i = 1; i < time; i++) {
  if ((time - i) * i > distance) {
    ways++;
  } else if (ways) {
    break;
  }
}

console.log(ways);
