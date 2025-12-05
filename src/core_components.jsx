import { Box, Typography } from '@mui/material';

function BaseBox({ maxWidth, children }) {
  maxWidth = maxWidth || '70em';
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        p: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          maxWidth: { maxWidth },
          height: 'auto',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

function Paragraph({ children }) {
  return (
    <Typography
      variant="body1"
      sx={{ mb: 2, textAlign: 'justify', fontWeight: 'light' }}
    >
      {children}
    </Typography>
  );
}

function Heading({ variant, centred, children }) {
  return (
    <Typography
      sx={{
        width: '100%',
        mb: 2,
        fontWeight: 'light',
        textAlign: centred ? 'center' : 'left',
      }}
      variant={variant || 'h1'}
    >
      {children}
    </Typography>
  );
}

function Error404() {
  return (
    <BaseBox>
      <Heading>404: Page not found</Heading>
    </BaseBox>
  );
}

export { BaseBox, Error404, Heading, Paragraph };
