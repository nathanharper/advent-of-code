import { describe, test, expect } from 'bun:test';
import {
  calculateScore,
  parseCardNumbers,
  generateScoreArray,
  calculateCardsWonRecursive,
  solve,
} from './part2'; // TODO: change this to your solution file

describe('Day 4, Part 2', () => {
  const sampleData = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;
  const sampleRow = 'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53';
  const sampleWinningNumbers = [41,48,83,86,17];
  const sampleMyNumbers = [83,86, 6,31,17, 9,48,53];

  describe('parseCardNumbers', () => {
    test('given a one line input string representing a card, parses 2 arrays containing "winning numbers" and "my numbers", and returns them as a tuple.', () => {
      const result = parseCardNumbers(sampleRow);
      expect(result).toEqual([
        sampleWinningNumbers,
        sampleMyNumbers,
      ]);
    });
  });

  describe('calculateScore', () => {
    test('given an array of "winning" numbers and an array of "my numbers", calculates the score', () => {
      const score = calculateScore(sampleWinningNumbers, sampleMyNumbers);
      expect(score).toBe(4);
    });
  });

  describe('generateScoreArray', () => {
    test('given a multiline string input of card rows, generates a 1d integer array containing the scores of each card in order', () => {
      const scores = generateScoreArray(sampleData);
      expect(scores).toEqual([4, 2, 2, 1, 0, 0]);
    });
  });

  describe('calculateCardsWonRecursive', () => {
    test('given a 0-based card index with a score of (x), and a card score array, returns 1 plus the total cards won for each of the next x cards.', () => {
      const startCard = 0;
      const scores = generateScoreArray(sampleData);
      expect(calculateCardsWonRecursive(startCard, scores)).toBe(15);
    });
  });

  describe('solve', () => {
    test('given a multiline string input of cards, calculates the sum of the total cards won for each card', () => {
      expect(solve(sampleData)).toBe(30);
    });
  });
});
