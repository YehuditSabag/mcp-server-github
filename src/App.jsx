import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import DarkModeToggle from './components/DarkModeToggle/DarkModeToggle';

const App = () => {
  return (
    <ThemeProvider>
      <div className="app">
        <header>
          <nav>
            {/* Other header content */}
            <DarkModeToggle />
          </nav>
        </header>
        {/* Rest of your app content */}
      </div>
    </ThemeProvider>
  );
};

export default App;