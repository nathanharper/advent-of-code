export function processData(input: String): String[] {
  return input.replace("\n", '').split(',');
}

export function hash(input: String): number {
  let result = 0;
  for (let i = 0; i < input.length; i++) {
    result += input.charCodeAt(i);
    result *= 17;
    result %= 256;
  }
  return result;
}
