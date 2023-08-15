import { sortHelpfulness, sortNewest, sortRelevance, sumHelper } from '../helpers.js';

const testReviewArray = [
  {
    helpfulness: 5,
    date: '2023-04-14T00:00:00.000Z'
  },
  {
    helpfulness: 3,
    date: '2018-04-14T00:00:00.000Z'
  },
  {
    helpfulness: 1,
    date: '2020-04-14T00:00:00.000Z'
  },
];

describe("sortHelpfulness", () => {

  test('sortHelpfulness function should return -1 when first argument larger than second', () => {
    expect(sortHelpfulness(testReviewArray[0],testReviewArray[2])).toEqual(-1);
  });

  test('sortHelpfulness function should return 1 when first argument smaller than second', () => {
    expect(sortHelpfulness(testReviewArray[2],testReviewArray[1])).toEqual(1);
  });

});

describe("sortNewest", () => {

  test('sortNewest function should return -1 when first argument larger than second', () => {
    expect(sortNewest(testReviewArray[0],testReviewArray[2])).toEqual(-1);
  });

  test('sortNewest function should return 1 when first argument smaller than second', () => {
    expect(sortNewest(testReviewArray[1],testReviewArray[2])).toEqual(1);
  });

});

describe("sortRelevance", () => {

  test('sortRelevance function should return -1 when first argument larger than second', () => {
    expect(sortRelevance(testReviewArray[0],testReviewArray[2])).toEqual(-1);
  });

  test('sortRelevance function should return 1 when first argument smaller than second', () => {
    expect(sortRelevance(testReviewArray[2],testReviewArray[0])).toEqual(1);
  });

});

describe("sumHelper", () => {

  test('sumHelper should return the sum of an array', () => {
    expect(sumHelper([1, 2, 3])).toEqual(6);
  });

  test('sumHelper should return 0 if array is empty', () => {
    expect(sumHelper([])).toEqual(0);
  });

});