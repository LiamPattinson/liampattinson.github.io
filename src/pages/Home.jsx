import './logos.css';

import {
  Description as CV,
  GitHub,
  ListAlt as Blog,
} from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  SvgIcon,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';

import muiLogo from '../assets/mui.svg';
import reactLogo from '../assets/react.svg';
import viteLogo from '../assets/vite.svg';

function HomePageTitle() {
  return (
    <Box
      sx={{
        p: 2,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h1" sx={{ p: 3, fontWeight: 'light' }}>
        liampattinson.github.io
      </Typography>
    </Box>
  );
}

function HomePageTextBox({ children }) {
  // 'children' should be a string delmited by newlines.
  // Each line will be rendered as a separate Typography component
  // with significant padding between them.
  return (
    <Box
      sx={{
        p: 2,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children.split('\n').map((str, index) => (
        <Typography
          key={index}
          variant="h4"
          component="div"
          sx={{ p: 3, fontWeight: 'light' }}
        >
          {str}
        </Typography>
      ))}
    </Box>
  );
}

function HomePageImages({ children }) {
  // A Box for displaying images on the homepage.
  // It should keep the images centered and evenly spaced,
  // even if the screen is resized.
  // The boxes below do the following:
  // - Center the images in the middle of the screen, take up
  //   the full width.
  // - Place images inside a flexbox that is centered and
  //   evenly spaces things inside.
  // - Give each image a bit of padding.
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexWrap: 'wrap',
          width: '50em',
        }}
      >
        {React.Children.map(children, (child, index) => (
          <Box key={index} sx={{ p: 2 }}>
            {child}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function Home() {
  // TODO: Figure out how to get logo styling and animations to
  // work without the CSS file.
  return (
    <>
      <HomePageTitle />
      <HomePageTextBox>
        {`Welcome to my personal website!\nI'm a research software engineer at the University of York.\nCheck out my GitHub profile, CV, and blog:`}
      </HomePageTextBox>
      <HomePageImages>
        <Tooltip title="GitHub">
          <IconButton
            href="https://github.com/LiamPattinson"
            target="_blank"
            aria-label="Link to GitHub profile"
          >
            <SvgIcon sx={{ width: '6em', height: '6em' }}>
              <GitHub />
            </SvgIcon>
          </IconButton>
        </Tooltip>
        <Tooltip title="CV">
          <IconButton href="/#/cv" aria-label="Link to CV">
            <SvgIcon sx={{ width: '6em', height: '6em' }}>
              <CV />
            </SvgIcon>
          </IconButton>
        </Tooltip>
        <Tooltip title="Blog">
          <IconButton href="/#/blog" aria-label="Link to blog">
            <SvgIcon sx={{ width: '6em', height: '6em' }}>
              <Blog />
            </SvgIcon>
          </IconButton>
        </Tooltip>
      </HomePageImages>
      <HomePageTextBox>
        {'Everything here was built using React, Vite, and Material UI:'}
      </HomePageTextBox>
      <HomePageImages>
        <Tooltip title="React">
          <IconButton
            href="https://react.dev"
            target="_blank"
            aria-label="Link to React website"
          >
            <img src={reactLogo} className="logo spin" alt="React logo" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Vite">
          <IconButton
            href="https://vite.dev"
            target="_blank"
            aria-label="Link to Vite website"
          >
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Material UI">
          <IconButton
            href="https://mui.com"
            target="_blank"
            aria-label="Link to Material UI website"
          >
            <img src={muiLogo} className="logo" alt="Material UI logo" />
          </IconButton>
        </Tooltip>
      </HomePageImages>
    </>
  );
}
