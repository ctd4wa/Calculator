import { act, render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('clicking a number updates the screen correctly', () => {
  render(<App />);
  fireEvent.click(screen.getByText("7"));
  fireEvent.click(screen.getByText("5"));
  const screenElement = screen.getByText(/75/);
  expect(screenElement).toBeInTheDocument();
});

test('clicking operations updates the display correctly', () => {
  render(<App />);
  fireEvent.click(screen.getByText("7"));
  fireEvent.click(screen.getByText("5"));
  fireEvent.click(screen.getByText("+"));
  fireEvent.click(screen.getByText("3"));
  fireEvent.click(screen.getByText("="));
  const screenElement = screen.getByText(/78/); // 75 + 3 = 78
  expect(screenElement).toBeInTheDocument();
});

test('clicking equals calculates the result', () => {
  render(<App />);
  fireEvent.click(screen.getByText("7"));
  fireEvent.click(screen.getByText("5"));
  fireEvent.click(screen.getByText("+"));
  fireEvent.click(screen.getByText("3"));
  fireEvent.click(screen.getByText("="));
  const screenElement = screen.getByText(/78/); // 75 + 3 = 78
  expect(screenElement).toBeInTheDocument();
});

test('clicking "+-" inverts the number', () => {
  render(<App />);
  fireEvent.click(screen.getByText("7"));
  fireEvent.click(screen.getByText("5"));
  fireEvent.click(screen.getByText("+"));
  fireEvent.click(screen.getByText("3"));
  fireEvent.click(screen.getByText("=")); // 75 + 3 = 78
  fireEvent.click(screen.getByText("+-")); // Inverts the result
  const screenElement = screen.getByText(/-78/); // Result should be -78
  expect(screenElement).toBeInTheDocument();
});

test('handles division by zero', () => {
  render(<App />);
  fireEvent.click(screen.getByText("5"));
  fireEvent.click(screen.getByText("/"));
  fireEvent.click(screen.getByText("0"));
  fireEvent.click(screen.getByText("="));
  const screenElement = screen.getByText(/Can't divide with 0/);
  expect(screenElement).toBeInTheDocument();
});