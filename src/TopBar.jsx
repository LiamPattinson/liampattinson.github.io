import DarkModeToggle from './DarkMode.jsx';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Box, Link } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';
import CvIcon from '@mui/icons-material/Description';

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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexGrow: 1,
          }}
        >
          <Box>
            <Link variant="h6" color="inherit" underline="none" href="/">
              LiamPattinson.com
            </Link>
          </Box>
          <Box>
            <IconButton href="/#/home">
              <HomeIcon />
            </IconButton>
            <IconButton href="/#/cv">
              <CvIcon />
            </IconButton>
          </Box>
          <Box>
            <IconButton href="https://www.github.com/LiamPattinson">
              <GitHubIcon />
            </IconButton>
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
