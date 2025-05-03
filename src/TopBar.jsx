import DarkModeToggle from './DarkMode.jsx';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Box, Link } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function TopBar({ darkMode, setDarkMode }) {
  return (
    <AppBar
      position="static"
      sx={{
        width: '100%',
        color: darkMode ? '#f2f2f2' : '#636363',
        backgroundColor: darkMode ? '#121212' : '#d9d9d9',
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Link variant="h6" color="inherit" underline="none" href="#">
            LiamPattinson.com
          </Link>
        </Box>
        <Box sx={{ alignItems: 'center' }}>
          <IconButton href="https://www.github.com/LiamPattinson">
            <GitHubIcon />
          </IconButton>
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
