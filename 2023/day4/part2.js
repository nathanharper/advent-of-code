const rows = require('fs').readFileSync(process.argv[2]).toString().split("\n").filter(x => x);

// create an array with the intersection count of each card and a bogus start card
const cardTotals = [rows.length, ...rows.map((row) => {
  const [, cardData] = row.split(': ');
  const [winningNumbers, myNumbers] = cardData.split(' | ').map((str) => {
    return str.trim().split(/\s+/);
  });
  return myNumbers.filter(num => winningNumbers.includes(num)).length;
})];

let sum = -1; // start at -1 to eliminate bogus start row
(function evalCard(rowIndex) {
  sum += 1;
  for (let i = 1; i <= cardTotals[rowIndex]; i++) {
    evalCard(rowIndex + i);
  }
})(0);
console.log(sum);
