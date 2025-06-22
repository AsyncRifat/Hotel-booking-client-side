import React, { useContext, useEffect, useState } from 'react';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';

const Theme = () => {
  const [theme, setTheme] = useState('light');

  useContext(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return (
    <>
      <button
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'}`}
        className=" p-1 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        {theme === 'dark' ? (
          <span className="text-yellow-300 text-md md:text-lg">
            <IoMdSunny />
          </span>
        ) : (
          <span className="text-gray-900 text-md md:text-lg">
            <IoMdMoon />
          </span>
        )}
      </button>
    </>
  );
};

export default Theme;
