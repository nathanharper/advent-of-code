const rows = require('fs').readFileSync(process.argv[2]).toString().split("\n").filter(x => x);

const numTest = /\d/;
const gearPositions = {};

function findGears(rowIndex, startIndex, numString) {
  if (rowIndex < 0 || rowIndex >= rows.length) return;
  const start = startIndex < 0 ? 0 : startIndex;
  for (let i = start; i < start + numString.length + 2; i++) {
    if (rows[rowIndex][i] === '*') {
      const name = `${rowIndex}-${i}`;
      gearPositions[name] ||= [];
      gearPositions[name].push(Number(numString));
    }
  }
}

rows.forEach((row, rowIndex) => {
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
      findGears(rowIndex - 1, prevIndex, num);
      findGears(rowIndex + 1, prevIndex, num);
      findGears(rowIndex, prevIndex, num);

      i = j + 1; // set to the index 2 after the last digit
    } else {
      // if this char isn't numeric, increment and continue
      i++;
    }
  }
});

const total = Object.values(gearPositions).reduce((sum, nums) => {
  if (nums.length !== 2) return sum;
  return sum + (nums[0] * nums[1]);
}, 0);

console.log(total);
