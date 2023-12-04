const { readFileSync } = require('fs');

const data = readFileSync('./data.txt').toString().split("\n");

const gameRegex = /^Game (\d+): (.*)$/;
const resources = {
	red: 12,
	green: 13,
	blue: 14,
};

function isValidPull(str) {
	const colorCounts = str.split(', ');

	for (let i = 0; i < colorCounts.length; i++) {
		let [ count, color ] = colorCounts[i].split(' ');
		count = Number(count);

		if (count > resources[color]) {
			return false;
		}
	}

	return true;
}

const answer = data.reduce((sum, str) => {
	if (!str?.length) return sum;

	let [, gameId, dataStr] = str.trim().match(gameRegex);
	gameId = Number(gameId);

	const pulls = dataStr.split('; ');

	for (let i = 0; i < pulls.length; i++) {
		if (!isValidPull(pulls[i])) {
			return sum;
		}
	}

	return gameId + sum;
}, 0);

console.log(answer);
