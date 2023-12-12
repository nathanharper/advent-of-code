type RowData = [String, number[]];

export function findFirstPosition(springs: String, group: number): number {
  for (let i = 0; i <= springs.length - group; i++) {
    let isMatch = true;
    let hashFound = false;
    for (let j = 0; j < group; j++) {
      const char = springs[i + j];
      hashFound ||= char === '#';
      if (char !== '#' && char !== '?') {
        isMatch = false;
        if (hashFound) return -1;
        break;
      }
    }
    if (isMatch) return i;
  }
  return -1;
}

function hasHash(str: String): boolean {
  return str.indexOf('#') >= 0;
}

export function countRowArrangements(springs: String, groups: number[]): number {
  if (!groups.length) {
    return hasHash(springs) ? 0 : 1;
  }
  if (!springs) return 0;

  const [group, ...nextGroups] = groups;

  let sum = 0;
  let i = 0;
  while (i <= springs.length - group) {
    const prev = springs.slice(0, i);
    if (hasHash(prev)) break;

    const substring = springs.slice(i);
    const index = findFirstPosition(substring, group);
    if (index >= 0) {
      if (substring[index + group] !== '#') {
        sum += countRowArrangements(substring.slice(index + group + 1), nextGroups);
      }
      i = i + index + 1;
    } else {
      break;
    }
  }
  return sum;
}

export function structureData(data: String): RowData {
  return data.trim().split("\n").filter(x => x).map(row => {
    const [springs, numberStr] = row.split(' ');
    const numbers = numberStr.split(',').map(n => Number(n));
    return [springs, numbers];
  });
}
