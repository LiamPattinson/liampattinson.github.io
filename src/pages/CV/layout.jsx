import { Box, Typography } from '@mui/material';

const golden_ratio = 1.6180339887;
const img_width = `${100 - 100 / golden_ratio}%`;
const text_width = `${100 / golden_ratio}%`;

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

function Heading({ main, children }) {
  return (
    <Typography
      sx={{
        width: '100%',
        mb: 2,
        fontWeight: 'light',
        typography: main !== undefined ? { xs: 'h2', md: 'h1' } : 'h3',
      }}
    >
      {children}
    </Typography>
  );
}

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

function TwoBox({ title, img, text, img_left, main }) {
  let img_box = (
    <Box
      sx={{
        p: 2,
        width: { xs: '100%', md: main === undefined ? img_width : '50%' },
        flexShrink: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        order: img_left ? undefined : { xs: 1, md: 2 },
      }}
    >
      {/* Extra box just adds margin on small screens */}
      <Box
        sx={{
          display: 'flex',
          width: { xs: '75%', md: '100%' },
        }}
      >
        {img}
      </Box>
    </Box>
  );
  let text_box = (
    <Box
      sx={{
        p: 2,
        width: { xs: '100%', md: main === undefined ? text_width : '50%' },
        flexWrap: 'wrap',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        order: img_left ? undefined : { xs: 2, md: 1 },
      }}
    >
      <Heading main={main}>{title}</Heading>
      {text}
    </Box>
  );
  return (
    <BaseBox>
      {img_left ? img_box : text_box}
      {img_left ? text_box : img_box}
    </BaseBox>
  );
}

function CentreBox({ title, children }) {
  return (
    <BaseBox maxWidth="50em">
      <Heading>{title}</Heading>
      <Box
        sx={{
          p: 2,
          width: '100%',
          flexWrap: 'wrap',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
    </BaseBox>
  );
}

export { CentreBox, Paragraph, TwoBox };
