// Import theme icons from lucide-react
import { Moon, Sun } from 'lucide-react';
// Import the custom useTheme hook
import { useTheme } from '../hooks/useTheme'; // adjust this path based on your project structure

// ThemeToggle component allows user to switch between dark and light mode
const ThemeToggle = () => {
  // Get the current theme and toggle function from context
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme} // Switches theme on click
      className="inline-flex items-center justify-center rounded-md border border-gray-300 
                 bg-white dark:bg-gray-800 px-3 py-1 text-sm font-medium 
                 text-gray-800 dark:text-gray-100 
                 hover:bg-gray-100 dark:hover:bg-gray-700 
                 transition-colors"
    >
      {/* Show Sun icon when theme is dark (to switch to light) */}
      {theme === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        // Show Moon icon when theme is light (to switch to dark)
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
};

export default ThemeToggle;
