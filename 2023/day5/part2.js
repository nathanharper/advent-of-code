const lines = require('fs').readFileSync(process.argv[2]).toString().split("\n").filter(x => x);

const getNums = str => str.match(/\d+/g).map(n => Number(n));
const seedNums = getNums(lines.shift());
const maps = [];

(() => {
  // conversion map setup
  let i = 0;
  while (i++ < lines.length) {
    const conversions = [];
    while (i < lines.length && /^\d/.test(lines[i])) {
      conversions.push(getNums(lines[i++]));
    }
    maps.push(conversions);
  }
})();

function findLocation(seed) {
  return maps.reduce((key, mappers) => {
    for (let i = 0; i < mappers.length; i++) {
      const [destBase, sourceBase, range] = mappers[i];
      if (key >= sourceBase && key <= sourceBase + range - 1) {
        return destBase + (key - sourceBase);
      }
    }
    return key;
  }, seed);
}

let min = Infinity;
for (let i = 0; i < seedNums.length; i++) {
  const start = seedNums[i];
  const range = seedNums[++i];

  for (let x = 0; x < range; x++) {
    const seed = x + start;
    min = Math.min(min, findLocation(seed));
  }
}

console.log(min);
