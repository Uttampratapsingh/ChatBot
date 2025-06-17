// Import necessary hooks and functions from React
import { createContext, useContext, useEffect, useState } from 'react';

// Create a context for the theme with default value as undefined
const ThemeContext = createContext(undefined);

// ThemeProvider component to wrap your app and provide theme context
export const ThemeProvider = ({ children }) => {
  // State to store the current theme ('light', 'dark', or 'system')
  const [themeState, setThemeState] = useState(() => {
    // On initial load, get theme from localStorage or default to 'system'
    return localStorage.getItem('theme') || 'system';
  });

  // Apply the effective theme to the root HTML element whenever themeState changes
  useEffect(() => {
    const root = window.document.documentElement;

    // Remove any existing theme classes
    root.classList.remove('light', 'dark');

    // Determine actual theme to apply:
    // - If 'system', use the user's OS-level preference
    // - Otherwise, use the selected theme
    const effectiveTheme =
      themeState === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : themeState;

    // Add the new theme class to the root element
    root.classList.add(effectiveTheme);
  }, [themeState]);

  // Value provided through context
  const value = {
    // Current theme
    theme: themeState,

    // Function to set a new theme and persist it to localStorage
    setTheme: (newTheme) => {
      localStorage.setItem('theme', newTheme);
      setThemeState(newTheme);
    },

    // Function to toggle between 'light' and 'dark' themes
    toggleTheme: () => {
      const newTheme = themeState === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      setThemeState(newTheme);
    },
  };

  // Return the ThemeContext provider with the context value
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// Custom hook to use the theme context in components
export const useTheme = () => {
  const context = useContext(ThemeContext);

  // Throw an error if useTheme is used outside of ThemeProvider
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  // Return the theme context
  return context;
};
