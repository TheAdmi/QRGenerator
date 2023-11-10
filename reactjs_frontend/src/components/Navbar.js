import React, { useState, useEffect } from "react";
import { QrCodeIcon, SunIcon, MoonIcon } from "@heroicons/react/24/solid";

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isCurrentlyDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(isCurrentlyDarkMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", darkMode);
  };

  return (
    <nav className="container p-6 mx-auto justify-between">
      <div className="flex items-center justify-between px-2">
        <span className="flex items-center">
          <QrCodeIcon className="h-7 w-7 sm:h-8 sm:w-8 fill-purple-600 align-bottom" />
          <span className="text-2xl sm:text-3xl font-bold mr-1 text-gray-900 dark:text-white">Generator</span>
        </span>
        <div>
          <span onClick={toggleDarkMode} className="cursor-pointer">
            {darkMode ? (
              <MoonIcon className="h-6 w-6 text-gray-900 dark:text-white" />
            ) : (
              <SunIcon className="h-6 w-6 text-gray-900 dark:text-white" />
            )}
          </span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;