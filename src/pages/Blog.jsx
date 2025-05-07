import { Box, Card, Divider, Typography } from '@mui/material';
import Markdown from 'react-markdown';
import { Prism } from 'react-syntax-highlighter';
import { xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { BaseBox, Heading } from '../core_components';
import articles from './Blog/articles.jsx';

// TODO:
// - Each blog post should be its own page under ./Blog
// - The front page should be a list of all the blog posts.
// - The blog post URL should be /blog/yyyymmdd-title
// - Each blog post should have a proper date
// - Provide prev/next navigation buttons at the bottom of each page.

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

function highlight_syntax(props) {
  const { children, className } = props;
  const match = /language-(\w+)/.exec(className || '');
  return match ? (
    <Prism language={match[1]} style={xonokai}>
      {children}
    </Prism>
  ) : (
    <code className={className}>{children}</code>
  );
}

function Blog() {
  return (
    <>
      {articles.map((md, idx) => (
        <span key={idx}>
          <BlogEntry key={idx} {...md.data}>
            <Markdown components={{ code: highlight_syntax }}>
              {md.content}
            </Markdown>
          </BlogEntry>
        </span>
      ))}
    </>
  );
}

export default Blog;
