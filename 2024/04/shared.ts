export function processInput(input: string): string[][] {
  return input.trim().split("\n").map(x => x.split(''));
}
