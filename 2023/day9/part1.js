const { readFileFromArg } = require('../../util/js/file');
const last = arr => arr[arr.length - 1];
const histories = readFileFromArg().map(line => {
  return line.split(' ').map(s => Number(s));
});

function getNextSequence(seq) {
  const next = [];
  for (let i = 0; i < seq.length - 1; i++) {
    next.push(seq[i + 1] - seq[i]);
  }
  return next;
}

function getAllSequences(seq) {
  const seqList = [seq];
  while (!last(seqList).every(x => x === 0)) {
    seqList.push(getNextSequence(last(seqList)));
  }
  return seqList;
}

function extrapolateSequence(seq) {
  const sequences = getAllSequences(seq).reverse();
  return sequences.reduce((acc, s) => {
    return acc + last(s);
  }, last(sequences.shift()));
}

const answer = histories.reduce((acc, h) => {
  return acc + extrapolateSequence(h);
}, 0);
console.log(answer);
