import { Box } from '@mui/material';

import { BaseBox, Heading } from '../../core_components';

const golden_ratio = 1.6180339887;
const img_width = `${100 - 100 / golden_ratio}%`;
const text_width = `${100 / golden_ratio}%`;

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
      <Heading variant={main ? 'h1' : 'h2'} centred>
        {title}
      </Heading>
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

function CentreBox({ title, children, main }) {
  return (
    <BaseBox maxWidth="50em">
      <Heading variant={main ? 'h1' : 'h2'} centred>
        {title}
      </Heading>
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

export { CentreBox, TwoBox };
