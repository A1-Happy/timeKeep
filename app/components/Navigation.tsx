import React from 'react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md p-4`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          TimeKeep
        </h1>
        <div className="space-x-4">
          <a href="#" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Home</a>
          <a href="#" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>About</a>
          <a href="#" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Contact</a>
          <Button
            onClick={toggleDarkMode}
            variant={darkMode ? "outline" : "default"}
            className={`${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`}
          >
            {darkMode ? 'Light' : 'Dark'}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
