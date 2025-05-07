import matter from 'gray-matter';
import Markdown from 'react-markdown';
import Prism from 'react-syntax-highlighter';
import { xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { BlogEntry } from './Blog/components';

const markdown = `---
title: Hello World
subtitle: My first blog post
published: May 7th 2025
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
occaecat cupidatat non proident, sunt in culpa qui officia deserunt
mollit anim id est laborum.

~~~python
import numpy as np

print("hello world")

with syntax_highlighting as yay:
   print("woo")
~~~
`;

// TODO:
// - Each blog post should be its own page under ./Blog
// - The front page should be a list of all the blog posts.
// - The blog post URL should be /blog/yyyymmdd-title
// - Provide some function to automate the addition of new posts.
// - Each blog post should have a proper date
// - Provide prev/next navigation buttons at the bottom of each page.

function Blog() {
  let md = matter(markdown);
  return (
    <BlogEntry
      title={md.data.title}
      subtitle={md.data.subtitle}
      published={md.data.published}
    >
      <Markdown
        children={md.content}
        components={{
          code(props) {
            const { children, className, node, ...rest } = props; // eslint-disable-line no-unused-vars
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <Prism
                {...rest}
                PreTag="div"
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
                style={xonokai}
              />
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      />
    </BlogEntry>
  );
}

export default Blog;
