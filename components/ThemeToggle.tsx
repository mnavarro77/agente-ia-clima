'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Evita hidratación mismatch
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative inline-flex h-10 w-18 items-center rounded-full bg-zinc-200 dark:bg-zinc-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
      aria-label="Cambiar tema"
    >
      <span className="sr-only">Cambiar tema</span>
      <span
        className={`${
          theme === 'dark' ? 'translate-x-9' : 'translate-x-1'
        } inline-block h-8 w-8 transform rounded-full bg-white dark:bg-zinc-900 shadow transition-transform duration-300 flex items-center justify-center`}
      >
        {theme === 'dark' ? (
          // Icono de luna
          <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          // Icono de sol
          <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        )}
      </span>
    </button>
  );
}
