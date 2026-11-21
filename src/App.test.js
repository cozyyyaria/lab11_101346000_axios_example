import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('axios', () => ({
  get: () => Promise.resolve({ data: { results: [] } }),
}));

test('renders the User List heading', () => {
  render(<App />);
  expect(screen.getByText('User List')).toBeInTheDocument();
});