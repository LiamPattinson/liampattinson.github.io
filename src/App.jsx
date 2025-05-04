import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import CV from './pages/CV.jsx';
import Home from './pages/Home.jsx';
import TopBar from './TopBar.jsx';

function App() {
  // Get the user's system preference for dark mode
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Initialize dark mode state based on local storage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    const savedPreference = sessionStorage.getItem('darkMode');
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
    sessionStorage.setItem('darkMode', JSON.stringify(darkMode));
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
        <title>LiamPattinson</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        ></link>
        <link rel="manifest" href="/site.webmanifest"></link>
        <TopBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Box sx={{ mt: 10, mb: 5 }}>
          {/* Margin to account for the AppBar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cv" element={<CV />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;
