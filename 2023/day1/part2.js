const { readFileSync } = require('fs');

const data = readFileSync(process.argv[2]).toString();
const rows = data.split("\n");

const numberWords = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};
const regex = new RegExp(`^(?:[0-9]|${Object.keys(numberWords).join('|')})`);

const total = rows.reduce((acc, txt) => {
  if (!txt?.length) return acc;

  const combined = getTotal(txt);

  return acc + Number(combined);
}, 0);

console.log(total);

function getTotal(str) {
  let first, last;

  for (let i = 0; i < str.length; i++) {
    const test = str.slice(i);
    let [ match ] = test.match(regex) || [];

    if (!match) continue;

    if (match.length > 1) {
      match = numberWords[match];
    }

    if (first) {
      last = match;
    } else {
      first = match;
    }
  }

  last ||= first;
  return Number(`${first}${last}`);
}
