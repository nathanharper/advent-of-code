const { readFileSync } = require('fs');

const rows = readFileSync('./data.txt').toString().split("\n");
const regex = /\d/g;

const total = rows.reduce((acc, txt) => {
  if (!txt?.length) return acc;

  const matches = txt.match(regex);
  const first = matches[0];
  const last = matches[matches.length - 1];

  return acc + Number(`${first}${last}`);
}, 0);

console.log(total);
