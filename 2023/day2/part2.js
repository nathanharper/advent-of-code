const { readFileSync } = require('fs');

const data = readFileSync('./data.txt').toString().split("\n");

const answer = data.reduce((sum, str) => {
	if (!str?.length) return sum;

	let [, dataStr] = str.trim().split(': ');

	const pulls = dataStr.split('; ');
	const maxes = {
		red: 0,
		green: 0,
		blue: 0,
	};

	for (let i = 0; i < pulls.length; i++) {
		const colorCounts = pulls[i].split(', ');

		for (let x = 0; x < colorCounts.length; x++) {
			const [ count, color ] = colorCounts[x].split(' ');
			maxes[color] = Math.max(maxes[color], Number(count));
		}
	}

	const power = maxes.red * maxes.green * maxes.blue;
	return power + sum;
}, 0);

console.log(answer);
