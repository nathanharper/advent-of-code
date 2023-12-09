module.exports = function readFileFromArg({ filterEmpty = true } = {}) {
  const lines = require('fs').readFileSync(process.argv[2]).toString().split("\n");
  return filterEmpty ? lines.filter(x => x) : lines;
}
