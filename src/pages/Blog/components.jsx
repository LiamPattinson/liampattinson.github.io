import { Box, Card, Divider, Typography } from '@mui/material';

import { BaseBox, Heading, Paragraph } from '../../core_components';

function BlogEntry({ title, subtitle, published, children }) {
  let heading = (
    <Box
      sx={{
        p: 2,
        width: '100%',
        textAlign: 'justify',
        display: 'flex',
        flexShrink: 1,
        flexDirection: 'column',
      }}
    >
      <Heading>{title}</Heading>
      <Typography variant="h6" sx={{ fontWeight: 'light', mb: 2 }}>
        {subtitle}
      </Typography>
      <Typography variant="caption" sx={{ fontWeight: 'light', mb: 1 }}>
        Published: {published}
      </Typography>
    </Box>
  );
  let article = (
    <BaseBox>
      <Card variant="outlined" sx={{ maxWidth: '100%' }}>
        {heading}
        <Divider variant="middle" flexItem sx={{ mb: 4 }} aria-hidden="true" />
        <Box
          sx={{
            p: 2,
            width: '100%',
            textAlign: 'justify',
            display: 'flex',
            flexShrink: 1,
            flexDirection: 'column',
          }}
        >
          {children}
        </Box>
      </Card>
    </BaseBox>
  );
  return article;
}

export { BlogEntry };
