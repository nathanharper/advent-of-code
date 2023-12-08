const lines = require('fs').readFileSync(process.argv[2]).toString().split("\n").filter(x => x);
const steps = lines.shift();
const regex = /(\w+) = \((\w+), (\w+)\)/;
const nodes = lines.reduce((acc, line) => {
  const [, node, left, right] = line.match(regex);
  acc[node] = [left, right];
  return acc;
}, {});

let currNode = 'AAA';
let step = 0;
while (++step) {
  currNode = steps[(step - 1) % steps.length] === 'R' ? nodes[currNode][1] : nodes[currNode][0];
  if (currNode === 'ZZZ') {
    console.log(step);
    break;
  }
}
