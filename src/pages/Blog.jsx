import { DoubleArrow } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import Markdown from 'react-markdown';
import { Route, Routes } from 'react-router-dom';
import { Prism } from 'react-syntax-highlighter';
import { xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { BaseBox, Error404, Heading } from '../core_components';
import articles from './Blog/articles.jsx';

// TODO:
// - Sort articles by date.
// - Provide prev/next navigation buttons at the bottom of each page.
// - Add sidebar with links to all articles. Could be tricky on mobile.
// - Add tags to articles and allow filtering.

function toDate(dateStr) {
  let date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function BlogEntry({ title, subtitle, published, children }) {
  let heading = (
    <Box
      sx={{
        p: 2,
        width: '100%',
        textAlign: 'left',
        display: 'flex',
        flexShrink: 1,
        flexDirection: 'column',
      }}
    >
      <Heading>{title}</Heading>
      <Heading variant="h2">{subtitle}</Heading>
      <Typography variant="caption" sx={{ fontWeight: 'light', mb: 1 }}>
        Published: {toDate(published)}
      </Typography>
    </Box>
  );
  let article = (
    <BaseBox>
      <Card variant="outlined" sx={{ maxWidth: '100%' }}>
        {heading}
        <Divider variant="middle" flexItem aria-hidden="true" />
        <Box
          sx={{
            p: 2,
            width: '100%',
            textAlign: 'left',
            display: 'flex',
            flexShrink: 1,
            flexDirection: 'column',
            mb: 4,
          }}
        >
          {children}
        </Box>
        <Divider variant="middle" flexItem aria-hidden="true" />
        {/* card that contains the "Back to blog" button
         * TODO: Add prev/next buttons here too
         */}
        <Card
          sx={{
            p: 2,
            width: '100%',
            textAlign: 'center',
            alignItems: 'center',
            display: 'flex',
            flexShrink: 1,
            flexDirection: 'column',
          }}
        >
          <Button href="#/blog">Back to blog</Button>
        </Card>
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

function BlogPages() {
  return (
    <Routes>
      {articles.map((article, idx) => (
        <Route
          key={idx}
          path={`${article.stem}`}
          element={
            <BlogEntry key={idx} {...article.markdown.data}>
              <Markdown components={{ code: highlight_syntax }}>
                {article.markdown.content}
              </Markdown>
            </BlogEntry>
          }
        />
      ))}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

function Blog() {
  return (
    <BaseBox>
      <Box
        sx={{
          p: 2,
          width: '100%',
          maxWidth: '50em',
          textAlign: 'center',
          display: 'flex',
          flexShrink: 1,
          flexDirection: 'column',
        }}
      >
        <Card variant="outlined" sx={{ textAlign: 'left', maxWidth: '100%' }}>
          <Box sx={{ mt: 2 }}>
            <Heading centred>Blog</Heading>
          </Box>
          <Divider variant="middle" flexItem aria-hidden="true" />
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: 'light', p: 4 }}
          >
            Welcome to my blog! Here I'll be jotting down whatever interests me
            at the time -- mainly programming, but maybe some other topics too.
          </Typography>
          <Divider variant="middle" flexItem aria-hidden="true" />
          <Box
            sx={{
              ml: { xs: 1, md: 4 },
              mr: { xs: 1, md: 4 },
            }}
          >
            <List>
              {articles.map((article, idx) => (
                <Tooltip title={article.markdown.data.title} key={idx}>
                  <ListItemButton
                    key={idx}
                    href={`#/blog/${article.stem}`}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      width: '100%',
                    }}
                    aria-label={`Read blog post: ${article.markdown.data.title}`}
                  >
                    <ListItem sx={{ width: '100%' }}>
                      <ListItemIcon>
                        <DoubleArrow />
                      </ListItemIcon>
                      <ListItemText
                        primary={article.markdown.data.title}
                        secondary={article.markdown.data.subtitle}
                      />
                      {toDate(article.markdown.data.published)}
                    </ListItem>
                  </ListItemButton>
                </Tooltip>
              ))}
            </List>
          </Box>
        </Card>
      </Box>
    </BaseBox>
  );
}

export { Blog, BlogPages };
