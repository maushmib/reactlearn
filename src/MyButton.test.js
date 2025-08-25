// MyButton.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import MyButton from './MyButton';

test('renders button with text', () => {
  render(<MyButton />);
  const buttonElement = screen.getByText(/Click Me/i);
  expect(buttonElement).toBeInTheDocument();
});
