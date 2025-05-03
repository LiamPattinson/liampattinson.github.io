import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import viteLogo from '../assets/vite.svg';
import reactLogo from '../assets/react.svg';
import muiLogo from '../assets/mui.svg';
import './logos.css';

export default function Home() {
  return (
    <>
      <Box
        sx={{
          p: 2,
          fontWeight: 'light',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4" sx={{ p: 3, fontWeight: 'light' }}>
          I made a website.
        </Typography>
        <Typography variant="h4" sx={{ p: 3, fontWeight: 'light' }}>
          Kinda.
        </Typography>
        <Typography variant="h4" sx={{ p: 3, fontWeight: 'light' }}>
          These things did most of the work:
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          width: '100%',
          gap: 2,
          p: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexWrap: 'wrap',
            width: '50em',
            gap: 2,
            p: 2,
          }}
        >
          <Box sx={{ p: 2 }}>
            <IconButton href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </IconButton>
          </Box>
          <Box sx={{ p: 2 }}>
            <IconButton href="https://vite.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </IconButton>
          </Box>
          <Box sx={{ p: 2 }}>
            <IconButton href="https://mui.com" target="_blank">
              <img src={muiLogo} className="logo mui" alt="Material UI logo" />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          p: 2,
          fontWeight: 'light',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4" sx={{ p: 3, fontWeight: 'light' }}>
          Here are some other cool things I made:
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          width: '100%',
          gap: 2,
          p: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexWrap: 'wrap',
            width: '50em',
            gap: 2,
            p: 2,
          }}
        >
          <Box>
            <Button
              href="https://www.github.com/PlasmaFAIR/Fortitude"
              target="_blank"
            >
              <img
                src="https://opengraph.githubassets.com/%3Cany_hash_number%3E/PlasmaFAIR/Fortitude"
                border="1px solid black"
                style={{ height: '12em', width: 'auto' }}
                alt="Fortitude repository"
              />
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
