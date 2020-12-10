import React from 'react';
import { render, screen } from '@testing-library/react';
import SaveForm from '../components/SaveForm';

test('renders learn react link', () => {
  render(<SaveForm />);
  const sectionElement = screen.getByRole(/tabpanel/);
  expect(sectionElement).toBeInTheDocument();
});
