const hands = {
  '11111': 1,
  '1112': 2,
  '122': 3,
  '113': 4,
  '23': 5,
  '14': 6,
  '5': 7,
};

const cards = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  'T': 10,
  'J': 11,
  'Q': 12,
  'K': 13,
  'A': 14,
};

function getHandScore(hand) {
  const counts = hand.split('').reduce((acc, card) => {
    acc[card] ||= 0;
    acc[card]++;
    return acc;
  }, {});
  const key = Object.values(counts).sort().join('');
  return hands[key];
}

// returns 1 if h1 wins, -1 if h2 wins, 0 for tie
function compareHands(hand1, hand2) {
  const [h1Score, h1] = hand1;
  const [h2Score, h2] = hand2;
  if (h1Score !== h2Score) {
    return h1Score - h2Score;
  }

  for (let i = 0; i < 5; i++) {
    const c1 = h1.slice(i, i+1);
    const c2 = h2.slice(i, i+1);
    if (c1 !== c2) {
      return cards[c1] - cards[c2];
    }
  }

  return 0;
}

function getLineStats(line) {
  const [hand, bid] = line.split(' ');
  const score = getHandScore(hand);
  return [score, hand, Number(bid)];
}

const answer = require('fs')
  .readFileSync(process.argv[2])
  .toString()
  .split("\n")
  .filter(x => x)
  .map(getLineStats)
  .sort(compareHands)
  .reduce((sum, [,, bid], index) => {
    return sum + bid * (index + 1);
  }, 0);

console.log(answer)
