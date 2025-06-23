import React, { useEffect, useState } from 'react';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';

const Theme = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    return systemPrefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'}`}
      className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
    >
      {theme === 'dark' ? (
        <span className="text-yellow-300 text-md md:text-xl">
          <IoMdSunny />
        </span>
      ) : (
        <span className="text-gray-900 text-md md:text-xl">
          <IoMdMoon />
        </span>
      )}
    </button>
  );
};

export default Theme;
