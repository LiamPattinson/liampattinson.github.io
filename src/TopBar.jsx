import DarkModeToggle from './DarkMode.jsx';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import './TopBar.css';

export default function TopBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton href="github.com/LiamPattinson/liampattinson-site">
            <GitHubIcon sx={{ display: { xs: 'none', md: 'flex' } }} />
          </IconButton>
          <DarkModeToggle />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
