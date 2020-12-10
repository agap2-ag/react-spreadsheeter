import React from 'react';
import { render, screen } from '@testing-library/react';
import Spreadsheeter from '../components/Spreadsheeter';

test('renders learn react link', () => {
  render(<Spreadsheeter />);
  const textElement = screen.getByText(/Spreadsheeter/);
  expect(textElement).toBeInTheDocument();
});
