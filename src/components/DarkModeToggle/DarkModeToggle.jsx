import React, { useEffect, useState } from 'react';
import './DarkModeToggle.css';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Get initial theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    setDarkMode(savedTheme === 'dark');
    
    // Apply theme to document
    document.documentElement.classList.toggle('dark-mode', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    // Save preference
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    
    // Apply theme
    document.documentElement.classList.toggle('dark-mode', newMode);
  };

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      <span className="icon">
        {darkMode ? '🌙' : '☀️'}
      </span>
    </button>
  );
};

export default DarkModeToggle;