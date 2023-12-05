const rows = require('fs').readFileSync('./data.txt').toString().split("\n").filter(x => x);

function stringListToNumberArray(str) {
  return str.trim().split(/\s+/).map(x => Number(x));
}

// create an array with the intersection count of each card
const cardTotals = rows.map((row) => {
  const [, cardData] = row.split(': ');
  const [winningNumbers, myNumbers] = cardData.split(' | ').map(stringListToNumberArray);
  return myNumbers.filter(num => winningNumbers.includes(num)).length;
});

function evalCard(rowIndex) {
  return 1 + Array(cardTotals[rowIndex] || 0).fill(1).reduce((sum, one, idx) => {
    return sum + evalCard(rowIndex + idx + one);
  }, 0);
}

const total = cardTotals.reduce((sum, _total, rowIndex) => {
  return sum + evalCard(rowIndex);
}, 0);
console.log(total);
