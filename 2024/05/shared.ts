export function processInput(input: string): object {
  const [rawRules, rawLists] = input.trim().split("\n\n");
  const rules = rawRules.split("\n").map(rawPair => {
    return rawPair.split('|').map(n => parseInt(n, 10));
  });
  const lists = rawLists.split("\n").map(rawList => {
    return rawList.split(',').map(n => parseInt(n, 10));
  });
  return { rules, lists };
}

export function obeysRule(list: number[], rule: [number, number]): boolean {
  const firstIdx = list.findIndex(x => x === rule[0]);
  const secondIdx = list.findIndex(x => x === rule[1]);
  if (firstIdx === -1 || secondIdx === -1) {
    // if either number isn't in the list, the rule does not apply
    return true;
  }
  return secondIdx > firstIdx;
}

export function getMiddleNumber(list: number[]): number {
  const midIdx = Math.floor(list.length / 2);
  return list[midIdx];
}

export function createReorderFunc(rules: [number,number][]): (list: number[]) => number[] {
  // TODO: if this is slow, may want to rejigger the data structure into a map
  return (list) => {
    return list.sort((a, b) => {
      const rule = rules.find(r => {
        return r.includes(a) && r.includes(b);
      });
      if (!rule) {
        return 0;
      }
      return rule.findIndex(x => x === a) || -1;
    });
  };
}
