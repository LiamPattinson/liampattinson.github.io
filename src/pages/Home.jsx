import './logos.css';

import { Description as CV, GitHub } from '@mui/icons-material';
import { Box, Button, IconButton, SvgIcon, Typography } from '@mui/material';
import React from 'react';

import muiLogo from '../assets/mui.svg';
import reactLogo from '../assets/react.svg';
import viteLogo from '../assets/vite.svg';

function HomePageTextBox({ children }) {
  // 'children' should be a string delmited by newlines.
  // Each line will be rendered as a separate Typography component
  // with significant padding between them.
  return (
    <Box
      sx={{
        p: 2,
        fontWeight: 'light',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children.split('\n').map((str, index) => (
        <Typography key={index} variant="h4" sx={{ p: 3, fontWeight: 'light' }}>
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
          p: 2,
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
      <HomePageTextBox>
        {'I made a website.\nKinda.\nThese things did most of the work:'}
      </HomePageTextBox>
      <HomePageImages>
        <IconButton href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo spin" alt="React logo" />
        </IconButton>
        <IconButton href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </IconButton>
        <IconButton href="https://mui.com" target="_blank">
          <img src={muiLogo} className="logo" alt="Material UI logo" />
        </IconButton>
      </HomePageImages>
      <HomePageTextBox>{"Here's another cool thing I made:"}</HomePageTextBox>
      <HomePageImages>
        <Button
          href="https://www.github.com/PlasmaFAIR/Fortitude"
          target="_blank"
        >
          <img
            src="https://opengraph.githubassets.com/%3Cany_hash_number%3E/PlasmaFAIR/Fortitude"
            border="1px solid black"
            style={{ maxHeight: '100%', maxWidth: '100%', flexShrink: 1 }}
            alt="Fortitude repository"
          />
        </Button>
      </HomePageImages>
      <HomePageTextBox>
        {'Want to see more?\nCheck out my GitHub profile and CV:'}
      </HomePageTextBox>
      <HomePageImages>
        <IconButton href="https://github.com/LiamPattinson" target="_blank">
          <SvgIcon sx={{ width: '6em', height: '6em' }}>
            <GitHub />
          </SvgIcon>
        </IconButton>
        <IconButton href="/#/cv" target="_blank">
          <SvgIcon sx={{ width: '6em', height: '6em' }}>
            <CV />
          </SvgIcon>
        </IconButton>
      </HomePageImages>
    </>
  );
}
