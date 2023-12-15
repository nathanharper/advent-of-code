export function processData(input: String): String[] {
  return input.replace("\n", '').split(',');
}

const memo = {};
export function hash(input: String): number {
  if (!memo[input]) {
    let result = 0;
    for (let i = 0; i < input.length; i++) {
      result += input.charCodeAt(i);
      result *= 17;
      result %= 256;
    }
    memo[input] = result;
  }
  return memo[input];
}
