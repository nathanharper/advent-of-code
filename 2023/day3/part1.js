const rows = require('fs').readFileSync('./data.txt').toString().split("\n").filter(x => x);

const numTest = /\d/;
const symbolTest = /[^0-9\.]/;

function hasSymbol(rowIndex, startIndex, length) {
  if (rowIndex < 0 || rowIndex >= rows.length) return false;
  const start = startIndex < 0 ? 0 : startIndex;
  return symbolTest.test(rows[rowIndex].slice(start, start + length + 2));
}

const total = rows.reduce((sum, row, rowIndex) => {
  let i = 0;
  // loop to search the row for numbers
  while (i < row.length) {
    let num = row[i];
    if (numTest.test(num)) {
      let j = i + 1;
      // loop to construct full number
      while (j < row.length && numTest.test(row[j])) {
        num += row[j++];
      }

      const prevIndex = i - 1;
      if (
        hasSymbol(rowIndex - 1, prevIndex, num.length)
        || hasSymbol(rowIndex + 1, prevIndex, num.length)
        || hasSymbol(rowIndex, prevIndex, num.length)
      ) {
        sum += Number(num);
      }

      i = j + 1; // set to the index 2 after the last digit
    } else {
      // if this char isn't numeric, increment and continue
      i++;
    }
  }

  return sum;
}, 0);

console.log(total);
