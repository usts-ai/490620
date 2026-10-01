import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('affiche le dashboard GLBForge', () => {
  render(<App />);
  expect(screen.getByText(/GLBForge|DWG/i)).toBeInTheDocument();
});
