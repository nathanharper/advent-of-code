const workRe = /^([a-z]+)\{(.+)\}$/;

export function processInput(input: String): [String[][], any] {
  const [ rawWorkflows, rawRatings ] = input.replace(/\n/g, ' ').split(/\s{2,}/).map(s => s.trim());
  const workflows = rawWorkflows.split(' ').reduce((acc, line) => {
    const [, key, data] = line.match(workRe);
    acc[key] = data.split(',').map(x => x.split(':'));
    return acc;
  }, {});
  const ratings = rawRatings.split(' ').map(x => {
    return JSON.parse(x.replace(/=/g, ':').replace(/[a-z]/g, z => `"${z}"`));
  });
  return [ workflows, ratings ];
}

export function evaluateRatings(ratings, workflows, start = 'in'): boolean {
  const checks = workflows[start];
  let result;
  for (let i = 0; i < checks.length; i++) {
    const [check, destination] = checks[i];
    let next;
    if (!destination) { // we hit the default
      next = check;
    } else {
      const variable = check.charAt(0);
      if (
        isNaN(ratings[variable])
        || !eval(`let ${variable}=${ratings[variable]};${check}`)
      ) continue;
      next = destination;
    }

    if (['R','A'].includes(next)) {
      return next === 'A';
    }
    return evaluateRatings(ratings, workflows, next);
  }
}

export function getRatingsScore(ratings): number {
  return Object.values(ratings).reduce((sum, n) => sum + n, 0);
}
