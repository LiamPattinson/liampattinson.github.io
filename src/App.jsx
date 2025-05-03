import React, { useMemo, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import TopBar from './TopBar.jsx';
import Home from './pages/Home.jsx';
import CV from './pages/CV.jsx';

function App() {
  // Get the user's system preference for dark mode
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Initialize dark mode state based on local storage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    const savedPreference = localStorage.getItem('darkMode');
    return savedPreference !== null ? JSON.parse(savedPreference) : prefersDark;
  });

  // Update dark mode if system preference changes
  useEffect(() => {
    const listener = (e) => setDarkMode(e.matches);
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Save dark mode preference to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  );

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TopBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cv" element={<CV />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
