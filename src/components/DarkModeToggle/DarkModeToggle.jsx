import React from 'react';
import useTheme from '../../hooks/useTheme';
import './DarkModeToggle.css';

// Analytics tracking function (replace with your analytics implementation)
const trackThemeToggle = (theme) => {
  if (window.analytics) {
    window.analytics.track('Theme Toggle', {
      theme,
      timestamp: new Date().toISOString(),
    });
  }
};

const DarkModeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  const handleToggle = () => {
    toggleTheme();
    trackThemeToggle(darkMode ? 'light' : 'dark');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <button
      className="theme-toggle"
      onClick={handleToggle}
      onKeyPress={handleKeyPress}
      aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
      aria-pressed={darkMode}
      title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
      type="button"
      data-testid="theme-toggle"
    >
      <span className="icon" aria-hidden="true">
        {darkMode ? '🌙' : '☀️'}
      </span>
      <span className="visually-hidden">
        {darkMode ? 'Dark mode enabled' : 'Light mode enabled'}
      </span>
    </button>
  );
};

export default DarkModeToggle;