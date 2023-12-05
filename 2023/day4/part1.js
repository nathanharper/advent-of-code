const rows = require('fs').readFileSync('./data.txt').toString().split("\n").filter(x => x);

function stringListToNumberArray(str) {
  return str.trim().split(/\s+/).map(x => Number(x));
}

const total = rows.reduce((sum, row) => {
  const [, cardData] = row.split(': ');
  const [winningNumbers, myNumbers] = cardData.split(' | ').map(stringListToNumberArray);
  const intersection = myNumbers.filter(num => winningNumbers.includes(num));

  if (intersection.length < 1) {
    return sum;
  }

  const cardTotal = 1 * Math.pow(2, intersection.length - 1);
  return sum + cardTotal;
}, 0);

console.log(total);
