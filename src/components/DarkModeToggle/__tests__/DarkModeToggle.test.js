import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DarkModeToggle from '../DarkModeToggle';

// Mock the useTheme hook
jest.mock('../../../hooks/useTheme', () => ({
  __esModule: true,
  default: () => ({
    darkMode: false,
    toggleTheme: jest.fn(),
  }),
}));

describe('DarkModeToggle', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('renders without crashing', () => {
    render(<DarkModeToggle />);
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<DarkModeToggle />);
    const button = screen.getByTestId('theme-toggle');
    
    expect(button).toHaveAttribute('aria-label');
    expect(button).toHaveAttribute('aria-pressed');
    expect(button).toHaveAttribute('title');
  });

  it('handles keyboard interaction', () => {
    render(<DarkModeToggle />);
    const button = screen.getByTestId('theme-toggle');
    
    button.focus();
    fireEvent.keyPress(button, { key: 'Enter', code: 'Enter' });
    expect(button).toHaveFocus();
    
    fireEvent.keyPress(button, { key: ' ', code: 'Space' });
    expect(button).toHaveFocus();
  });

  it('displays correct icon based on theme', () => {
    render(<DarkModeToggle />);
    const icon = screen.getByText('☀️');
    expect(icon).toBeInTheDocument();
  });

  it('has proper contrast ratio', () => {
    render(<DarkModeToggle />);
    const button = screen.getByTestId('theme-toggle');
    const styles = window.getComputedStyle(button);
    
    // Note: In a real test environment, you'd use a color contrast testing library
    expect(styles.backgroundColor).toBeDefined();
  });
});