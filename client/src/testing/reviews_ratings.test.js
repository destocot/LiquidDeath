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
// import Sorting from '../components/Reviews-Ratings/ReviewsList';
import ReviewTile from '../components/Reviews-Ratings/ReviewsList';
// import ReviewTileBody from '../components/Reviews-Ratings/ReviewsList';
// import RatingBreakdown from '../components/Reviews-Ratings/RatingBreakdown';
import BreakdownComp from '../components/Reviews-Ratings/RatingBreakdown';
// import ProductBreakdown from '../components/Reviews-Ratings/RatingBreakdown';
import NewReviewForm from '../components/Reviews-Ratings/ReviewForm';
import initial from "../PlaceHolderData.js";

// I think I can delete this?
// import App from '../../../App';
// no longer needed?
// test('use jsdom in this test file', () => {
//   const element = document.createElement('div');
//   expect(element).not.toBeNull();
// });

const sumHelper = helpers.sumHelper;
const currProductId= 37234;
const currProductName= 'Jaylen Backpack';
const initReviews = initial.reviews;
const filteredReviews = initial.reviews.results;
const reviewsMeta = {
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
  },
}

jest.mock("axios");
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

import { useState } from "react";

describe("ability to render all components and subcomponents", () => {
  beforeEach(() => {
    useState.mockImplementation(jest.requireActual("react").useState);
  });

  test("ratings and reviews component renders", async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: [] }));

    render(
      <ReviewsRatings
        reviewsMeta={reviewsMeta}
        currProductId={currProductId}
        currProductName={currProductName}
        initReviews={initial.reviews}
      />
    );
  });

  test("check if new answer form pops up", async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: [] }));
    const { getByTestId } = render(
      <NewReviewForm
      setAForm={() => {console.log('hello world')}}
      reviewsMeta={reviewsMeta}
      currProductName={currProductName}
      currProductId={currProductId} />
    );

    fireEvent.click(getByTestId("add-review-btn"));

    const title = screen.getByText(
      'Write Your Review'
    );
    expect(title).toBeInTheDocument();

    const currProductText = screen.getByText(
      `About the ${currProductName}`
    );
    expect(currProductText).toBeInTheDocument();
  });

  test("NewReviewsForm component renders", async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: [] }));

    render(
      <NewReviewForm
      setAForm={() => {console.log('hello world')}}
      reviewsMeta={reviewsMeta}
      currProductName={currProductName}
      currProductId={currProductId} />
    );
  });

  test("check that more reviews button expands list past 2 after click", async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: [] }));

    render(
      <ReviewsList
      filteredReviews={initial.reviews.results}
      filters={[1, 2, 3, 4, 5]}
      reviewsMeta={reviewsMeta}
      currProductName={currProductName}
      currProductId={currProductId}
      updReviews={initial.reviews} />
    );

    const parentDiv = screen.getByTestId('reviews-list');
    let childElements = parentDiv.querySelectorAll('[role="listitem"]'); // using role allows to only query what is rendered

    const moreReviewsBtn = screen.getByTestId("more-reviews-btn");

    let numberOfChildElements = childElements.length;
    expect(numberOfChildElements).toBe(2);

    fireEvent.click(moreReviewsBtn);

    numberOfChildElements = parentDiv.querySelectorAll('[role="listitem"]').length;
    expect(numberOfChildElements).toBeGreaterThan(2);
  });

  test("check that filters applied text appears when a rating filter is applied", async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: [] }));

    render(
      <BreakdownComp
      filters={{ratings: [2]}}
      updateFilters={() => console.log('test')}
      reviewsMeta={reviewsMeta}
      />
    );

    const filterText = screen.getByText(
      `Filters Applied:`
    );
    expect(filterText).toBeInTheDocument();
    const resetFilterText = screen.getByText(
      `Reset Filters`
    );
    expect(resetFilterText).toBeInTheDocument();
  });

  // test("check that clicking helpful changes value by 1", async () => {
  //   axios.get.mockImplementation(() => Promise.resolve({ data: [] }));

  //   render(
  //     <ReviewsList
  //     filteredReviews={initial.reviews.results}
  //     filters={{ratings: []}}
  //     reviewsMeta={reviewsMeta}
  //     currProductName={currProductName}
  //     currProductId={currProductId}
  //     updReviews={initial.reviews}
  //     />
  //   );

  //   const helpfulCount = screen.getByTestId("helpful-count");
  //   console.log(helpfulCount);

    // let numberOfChildElements = childElements.length;
    // expect(numberOfChildElements).toBe(2);

    // fireEvent.click(moreReviewsBtn);

    // numberOfChildElements = parentDiv.querySelectorAll('[role="listitem"]').length;
    // expect(numberOfChildElements).toBeGreaterThan(2);
  // });

});

// Function Testing
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
    expect(calcAvgRating(testObj)).toBe("1.5");
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
