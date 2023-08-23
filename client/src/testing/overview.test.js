import React from 'react';
import { render, screen, cleanup, fireEvent, act } from '@testing-library/react';
import "@testing-library/jest-dom";
import initial from "../PlaceHolderData.js";
import axios from 'axios';
// components, features, and helper functions for testing
import Overview from '../components/Overview';
import AddCart from '../components/Overview/Features/AddCart';
import ImageGallery from '../components/Overview/Features/ImageGallery';
import ProductInfo from '../components/Overview/Features/ProductInfo';
import CartForm from '../components/Overview/Features/AddCart/CartForm';
import BigCarousel from '../components/Overview/Features/ImageGallery/BigCarousel';
import BigImage from '../components/Overview/Features/ImageGallery/BigImage';
import Image from '../components/Overview/Features/ImageGallery/Image';
import ImageCarousel from '../components/Overview/Features/ImageGallery/ImageCarousel';
import Description from '../components/Overview/Features/ProductInfo/Description';
import ProductIdentifiers from '../components/Overview/Features/ProductInfo/ProductIdentifiers';
import Sharing from '../components/Overview/Features/ProductInfo/Sharing';
import StarsAndReviews from '../components/Overview/Features/ProductInfo/StarsAndReviews';
import helpers from '../helpPlease';

jest.mock("axios");
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

import { useState } from "react";

const windowSize = {
  width: 1800,
  height: 1250,
}

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

const setConfetti = () => { return false };
const setNumInCart = () => { return 0 };


/**
 * @jest-environment jsdom
 */

test('use jsdom in this test file', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});

describe('Product Identifier Component Test', () => {
  test('should render Product Identifier component', () => {
    render(<ProductIdentifiers product={initial.product} currentStyle={initial.styles.results[0]}/>);
    const productIdentifiersElement = screen.getAllByTestId('product-identifiers');
    expect(productIdentifiersElement).toHaveLength(1);
  })
});

describe('Overview Component Test', () => {
  beforeEach(() => {
    useState.mockImplementation(jest.requireActual("react").useState);
  });
  axios.get.mockImplementation(() => Promise.resolve({ data: [] }));
  test('should render the Overview component', () => {
    render(
    <Overview
      product={initial.product}
      reviewsMeta={reviewsMeta}
      setConfetti={setConfetti}
      setNumInCart={setNumInCart}
      windowSize={windowSize}
    />);
  })
});

describe('AddCart Component Test', () => {
  beforeEach(() => {
    useState.mockImplementation(jest.requireActual("react").useState);
  });
  axios.get.mockImplementation(() => Promise.resolve({ data: [] }));
  test('should render the AddCart component', () => {
    render(
    <AddCart
    currentStyle={initial.styles.results[0]}
    setConfetti={setConfetti}
    setNumInCart={setNumInCart}
    />);
  })
});

describe('ImageGallery Component Test', () => {
  beforeEach(() => {
    useState.mockImplementation(jest.requireActual("react").useState);
  });
  axios.get.mockImplementation(() => Promise.resolve({ data: [] }));
  test('should render the ImageGallery component', () => {
    render(
    <ImageGallery
    currentStyle={initial.styles.results[0]}
    setCurrentStyle={() => false}
    styles={initial.styles.results}
    view={false}
    toggleExpand={() => false}
    windowSize={windowSize}
    />);
  })
});

describe('ProductInfo Component Test', () => {
  beforeEach(() => {
    useState.mockImplementation(jest.requireActual("react").useState);
  });
  axios.get.mockImplementation(() => Promise.resolve({ data: [] }));
  test('should render the ProductInfo component', () => {
    render(
    <ProductInfo
    product={initial.product}
    currentStyle={initial.styles.results[0]}
    reviewsMeta={reviewsMeta}
    setConfetti={setConfetti}
    />);
  })
});

describe('CartForm feature Test', () => {
  beforeEach(() => {
    useState.mockImplementation(jest.requireActual("react").useState);
  });
  axios.get.mockImplementation(() => Promise.resolve({ data: [] }));
  test('should render the CartForm feature', () => {
    render(
    <CartForm
    currentStyle={initial.styles.results[0]}
    handleSubmit={(e) => e.preventDefault()}
    needed={false}
    setNeeded={() => true}
    size={'SELECT SIZE'}
    setSize={() => 'small'}
    quantity={'-'}
    setQuantity={() => 5}
    />);
  })
});

describe('BigCarousel feature Test', () => {
  beforeEach(() => {
    useState.mockImplementation(jest.requireActual("react").useState);
  });
  axios.get.mockImplementation(() => Promise.resolve({ data: [] }));
  test('should render the BigCarousel feature', () => {
    render(
      <BigCarousel
      currentStyle={initial.styles.results[0]}
      img={initial.styles.results[0].photos[0].url}
      setImg={() => false}
      styles={initial.styles.results}
      setCurrentStyle={() => false}
    />);
  })
});

describe('BigImage feature Test', () => {
  beforeEach(() => {
    useState.mockImplementation(jest.requireActual("react").useState);
  });
  axios.get.mockImplementation(() => Promise.resolve({ data: [] }));
  test('should render the BigImage feature', () => {
    render(
      <BigImage
      windowSize={windowSize}
      currentStyle={initial.styles.results[0]}
      img={initial.styles.results[0].photos[0].url}
      setImg={() => false}
      styles={initial.styles.results}
      setCurrentStyle={() => false}
    />);
  })
});

describe('Image feature Test', () => {
  beforeEach(() => {
    useState.mockImplementation(jest.requireActual("react").useState);
  });
  axios.get.mockImplementation(() => Promise.resolve({ data: [] }));
  test('should render the Image feature', () => {
    render(
      <Image
      toggleExpand={() => false}
      currentStyle={initial.styles.results[0]}
      img={initial.styles.results[0].photos[0].url}
    />);
  })
});

describe('ImageCarousel feature Test', () => {
  beforeEach(() => {
    useState.mockImplementation(jest.requireActual("react").useState);
  });
  axios.get.mockImplementation(() => Promise.resolve({ data: [] }));
  test('should render the ImageCarousel feature', () => {
    render(
      <ImageCarousel
      up={false}
      down={false}
      toggleUp={() => false}
      toggleDown={() => false}
      styles={initial.styles.results}
      setImg={() => false}
      setCurrentStyle={() => false}
      toggleExpand={() => false}
      currentStyle={initial.styles.results[0]}
      img={initial.styles.results[0].photos[0].url}
    />);
  })
});

describe('Description feature Test', () => {
  beforeEach(() => {
    useState.mockImplementation(jest.requireActual("react").useState);
  });
  axios.get.mockImplementation(() => Promise.resolve({ data: [] }));
  test('should render the Description feature', () => {
    render(<Description product={initial.product} />);
  })
});

describe('Sharing feature Test', () => {
  beforeEach(() => {
    useState.mockImplementation(jest.requireActual("react").useState);
  });
  axios.get.mockImplementation(() => Promise.resolve({ data: [] }));
  test('should render the Sharing feature', () => {
    render(<Sharing />);
  })
});

describe('StarsAndReviews feature Test', () => {
  beforeEach(() => {
    useState.mockImplementation(jest.requireActual("react").useState);
  });
  axios.get.mockImplementation(() => Promise.resolve({ data: [] }));
  test('should render the StarsAndReviews feature', () => {
    render(<StarsAndReviews reviewScore={helpers.reviewScore(reviewsMeta)} setConfetti={setConfetti} />);
  })
});

describe("test the style matrix", () => {
  test('stylematrix should return an array with a length', () => {
    expect(helpers.styleMatrix(initial.styles.results, initial.styles.results[0], () => false).length).toBeGreaterThan(0);
  });
});

describe("test the form parser", () => {
  test('form parser should return an object with at least one key', () => {
    expect(Object.keys(helpers.formParser([{ name: 'name', value: 'value' }])).length).toBeGreaterThan(0);
  });
});

describe("test the price checker", () => {
  test('price checker should return something', () => {
    expect(helpers.priceChecker(initial.product)).toBeDefined();
  });
});

describe("test the review stars function", () => {
  test('review stars should return something', () => {
    expect(helpers.reviewStars()).toBeDefined();
  });
});

describe("test the review score function", () => {
  test('review score should return something if there is metadata', () => {
    expect(helpers.reviewScore(reviewsMeta)).toBeDefined();
  });
  test('review score should return null if no data', () => {
    expect(helpers.reviewScore({ ratings: {} })).toBeNull();
  });
});
