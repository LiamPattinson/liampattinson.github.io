import { Description as CV, GitHub, Home } from '@mui/icons-material';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import DarkModeToggle from './DarkMode.jsx';

export default function TopBar({ darkMode, setDarkMode }) {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    console.log('Location changed:', location.pathname);
    setCurrentPath(location.pathname);
  }, [location]);

  const boxShadow = (paths) =>
    paths.some((x) => x === currentPath)
      ? '0px 4px 10px rgba(0, 0, 0, 0.2)'
      : null;

  const highlight = (paths) =>
    paths.some((x) => x === currentPath) ? 'rgb(20, 146, 196)' : null;

  const TopBarIconButton = ({ href, alts, children }) => {
    alts = alts ?? [];
    let paths = [...alts, href];
    href = href.includes('/#') ? href : `/#${href}`;
    return (
      <IconButton
        href={href}
        sx={{
          ml: { xs: 1, md: 2 },
          mr: { xs: 1, md: 2 },
          color: highlight(paths),
          boxShadow: boxShadow(paths),
        }}
      >
        {children}
      </IconButton>
    );
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: '100%',
        color: darkMode ? '#f2f2f2' : '#636363',
        backgroundColor: darkMode ? '#121212' : '#d9d9d9',
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexGrow: 1,
          }}
        >
          <Box>
            <TopBarIconButton href="/home" alts={['/']}>
              <Home />
            </TopBarIconButton>
            <TopBarIconButton href="/cv">
              <CV />
            </TopBarIconButton>
          </Box>
          <Box>
            <IconButton href="https://www.github.com/LiamPattinson">
              <GitHub />
            </IconButton>
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
