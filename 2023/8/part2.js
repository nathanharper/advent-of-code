const lines = require('fs').readFileSync(process.argv[2]).toString().split("\n").filter(x => x);
const steps = lines.shift();
const regex = /(\w+) = \((\w+), (\w+)\)/;

const nodes = lines.reduce((acc, line) => {
  const [, node, left, right] = line.match(regex);
  acc[node] = [left, right];
  return acc;
}, {});

// I stole this from SO https://stackoverflow.com/a/31302607
function lowestCommonMultiple(range) {
  function gcd(a, b) {
    return !b ? a : gcd(b, a % b);
  }

  function lcm(a, b) {
    return (a * b) / gcd(a, b);
  }

  return range.reduce((acc, n) => {
    return lcm(acc, n);
  }, Math.min(...range));
}

let currNodes = Object.keys(nodes).filter(n => n.endsWith('A'));

let step = 0;
while (++step) {
  const currStep = (step - 1) % steps.length;
  currNodes = currNodes.map(node => {
    if (!isNaN(node)) return node; // already solved
    const next = steps[currStep] === 'R' ? nodes[node][1] : nodes[node][0];
    if (next.endsWith('Z')) return step;
    return next;
  });
  if (currNodes.every(n => !isNaN(n))) {
    break;
  }
}
console.log(lowestCommonMultiple(currNodes));
