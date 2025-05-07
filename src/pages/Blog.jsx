import { Paragraph } from '../core_components';
import { BlogEntry } from './Blog/components';

// TODO:
// - Each blog post should be its own page under ./Blog
// - The front page should be a list of all the blog posts.
// - The blog post URL should be /blog/yyyymmdd-title
// - Provide some function to automate the addition of new posts.
// - Each blog post should have a proper date
// - Provide prev/next navigation buttons at the bottom of each page.

function Blog() {
  return (
    <BlogEntry
      title="Hello World"
      subtitle="My first blog post"
      published="May 7th 2025"
    >
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Paragraph>
    </BlogEntry>
  );
}

export default Blog;
