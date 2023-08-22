/**
 * @jest-environment jsdom
 */
import React from 'react';
import helpers from '../helpPlease';
import { render, screen, cleanup, fireEvent, act } from '@testing-library/react';
import "@testing-library/jest-dom";
import axios from 'axios';

// import all components
import ReviewsRatings from '../components/Reviews-Ratings';
import ReviewsList from '../components/Reviews-Ratings/ReviewsList';
import Sorting from '../components/Reviews-Ratings/ReviewsList';
import ReviewTile from '../components/Reviews-Ratings/ReviewsList';
import ReviewTileBody from '../components/Reviews-Ratings/ReviewsList';
import NewReviewForm from '../components/Reviews-Ratings/ReviewsList';
import RatingBreakdown from '../components/Reviews-Ratings/RatingBreakdown';
import BreakdownComp from '../components/Reviews-Ratings/RatingBreakdown';
import ProductBreakdown from '../components/Reviews-Ratings/RatingBreakdown';
// import NewReviewForm from '../components/Reviews-Ratings/ReviewForm';

// I think I can delete this?
// import App from '../../../App';
const sumHelper = helpers.sumHelper;

const getReviewsMeta = {
  product_id: '2',
  ratings: {
    2: 1,
    3: 1,
    4: 2,
    // ...
  },
  recommended: {
    0: 5,
    // ...
  },
  characteristics: {
    Size: {
      id: 14,
      value: '4.0000',
    },
    Width: {
      id: 15,
      value: '3.5000',
    },
    Comfort: {
      id: 16,
      value: '4.0000',
    },
    // ...
  },
}

jest.mock("axios");
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));
import { useState } from "react";

// describe("ability to render all components and subcomponents", () => {
//   beforeEach(() => {
//     useState.mockImplementation(jest.requireActual("react").useState);
//   });

// });

test('use jsdom in this test file', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});

// describe('ReviewsRatings Component', () => {
//   test('should render ReviewsRatings component', () => {
//     render(<NewReviewForm setAForm={() => console.log('test') } reviewsMeta={getReviewsMeta} currProductName="jordans"/>);
//     const reviewsRatingsElement = screen.getAllByTestId('review-form-parent-id');
//     expect(reviewsRatingsElement).toHaveLength(3);
//   })
// });

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

// Function Testing
describe("sumHelper", () => {

  test('sumHelper should return the sum of an array', () => {
    expect(sumHelper([1, 2, 3])).toEqual(6);
  });

  test('sumHelper should return 0 if array is empty', () => {
    expect(sumHelper([])).toEqual(0);
  });

});

describe("recommended" , () => {
  const recommended = helpers.recommended;
  var testObj = {
    true: '2',
    false: '8',
  };

  test('recommended function should count true and false values and return % of true as a string', () => {
    expect(recommended(testObj)).toBe('20%');
  })
});

describe("calcAvgRating" , () => {
  const calcAvgRating = helpers.calcAvgRating;
  var testObj = {1: '1', 2: '1', 3: '0', 4: '0', 5: '0'};

  test('calcAvgRating should take an object and return a value representing average rating', () => {
    expect(calcAvgRating(testObj)).toBe(1.5);
  })
});

describe("normalizeData" , () => {
  const normalizeData = helpers.normalizeData;
  var testObj = [
    {helpfulness: 1, date: "2020-08-12T00:00:00.000Z"},
    {helpfulness: 2, date: "2023-08-12T00:00:00.000Z"},
  ]

  test('should rank items with low helpfulness and long ago dates lower than recent and high helpfulness', () => {
    var result = (normalizeData(testObj));
    expect(result[0].sortRelMetric).toBe(0);
    expect(result[1].sortRelMetric).toBeGreaterThan(0);
  })

});

describe("sortRelevance" , () => {
  const sortRelevance = helpers.sortRelevance;
  var testObj = [
    {name: 'c', helpfulness: 1, date: "2020-08-12T00:00:00.000Z"},
    {name: 'a', helpfulness: 3, date: "2023-08-12T00:00:00.000Z"},
    {name: 'b', helpfulness: 2, date: "2021-08-12T00:00:00.000Z"},
  ]

  test('should alter order of the array', () => {
    var result = (sortRelevance(testObj));
    expect(result[0].name).toBe('a');
    expect(result[1].name).toBe('b');
    expect(result[2].name).toBe('c');
  })
});

describe("charChecker" , () => {
  const charChecker = helpers.charChecker;
  var testStateObjPass = {
    1: 3,
    2: 2,
  }

  var testStateObjFailAll = {
  }

  var testStateObjFailPartial = {
    1: 3,
  }

  var testProductChars = {
    Quality: {
      id: 1,
      value: "not important",
    },
    Size: {
      id: 2,
      value: "not important"
    }

  }

  test('should return true if user has checked a rating for all characteristics in form', () => {
    expect(charChecker(testStateObjPass, testProductChars)).toBe(true);
  })

  test('should return false if user has not checked a rating for any characteristics in form', () => {
    expect(charChecker(testStateObjFailAll, testProductChars)).toBe(false);
  })

  test('should return false if user has not checked a rating for all characteristics in form', () => {
    expect(charChecker(testStateObjFailPartial, testProductChars)).toBe(false);
  })
});

// describe("sortRelevance", () => {

//   test('sortRelevance function should return -1 when first argument larger than second', () => {
//     expect(sortRelevance(testReviewArray[0],testReviewArray[2])).toEqual(-1);
//   });

//   test('sortRelevance function should return 1 when first argument smaller than second', () => {
//     expect(sortRelevance(testReviewArray[2],testReviewArray[0])).toEqual(1);
//   });

// });

