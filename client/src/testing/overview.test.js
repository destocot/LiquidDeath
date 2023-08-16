import { render, screen, cleanup } from '@testing-library/react';
import ProductIdentifiers from '../components/Overview/Features/ProductInfo/ProductIdentifiers';
import { product, styles } from '../PlaceHolderData';

/**
 * @jest-environment jsdom
 */

test('use jsdom in this test file', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});

describe('Product Identifier Component Test', () => {
  test('should render Product Identifier component', () => {
    render(<ProductIdentifiers product={product} currentStyle={styles.results[0]}/>);
    const productIdentifiersElement = screen.getAllByTestId('product-identifiers');
    expect(productIdentifiersElement).toHaveLength(1);
  })
});
