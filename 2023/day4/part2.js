const rows = require('fs').readFileSync('./data.txt').toString().split("\n").filter(x => x);

// create an array with the intersection count of each card
const cardTotals = rows.map((row) => {
  const [, cardData] = row.split(': ');
  const [winningNumbers, myNumbers] = cardData.split(' | ').map((str) => {
    return str.trim().split(/\s+/).map(x => Number(x));
  });
  return myNumbers.filter(num => winningNumbers.includes(num)).length;
});
cardTotals.unshift(cardTotals.length);

let sum = -1;
(function evalCard(rowIndex) {
  sum += 1;
  for (let i = 1; i <= cardTotals[rowIndex]; i++) {
    evalCard(rowIndex + i);
  }
})(0);
console.log(sum);
