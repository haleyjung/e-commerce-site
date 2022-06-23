/**
 * Dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { render, screen, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

/**
 * Component
 */
import App from './App.jsx';

/*
 * Unit Tests
*/
describe('App', () => {
  test('Header renders inside App', () => {
    const { getByTestId } = render(<App />);
    const main = getByTestId('main');
    const header = getByTestId('header');
    expect(main).toContainElement(header);
  });
});