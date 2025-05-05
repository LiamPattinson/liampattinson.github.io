import { Description as CV, GitHub, Home } from '@mui/icons-material';
import { AppBar, Box, IconButton, Link, Toolbar } from '@mui/material';

import DarkModeToggle from './DarkMode.jsx';

export default function TopBar({ darkMode, setDarkMode }) {
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
            <IconButton href="/#/home">
              <Home />
            </IconButton>
            <IconButton href="/#/cv">
              <CV />
            </IconButton>
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
