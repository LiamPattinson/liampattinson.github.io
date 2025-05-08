---
title: Hello, World!
subtitle: Making a personal website with React.
published: 2025-05-08
---

First ever blog post on my first ever website!

For a bit of background, I'm a Research Software Engineer working in physics,
which means things like C++, Fortran, and Python are my comfort zone. Ever since
the start of my career I've had a weird blind-spot for anything that touches the
web, and I figured now was the time to correct that. I'm currently subjecting
myself to a crash course in JavaScript and web-dev in general, and using this
website as a space to experiment and learn what I can.

To make the project more challenging and education, I set a few ground rules
for myself:

- JavaScript all the way down.
- No high-level frameworks to build the site from a pre-made template -- this is
  a learning experience, so I need to understand what's happening under the hood.
- It _must_ continue to work and look good on mobile.

The aim is to create something of a meta-portfolio: not only will the site
host my CV and blog, it will also serve as a demonstration of all the cool
things I've figured out in the field of web design.

### The Core Stack

After doing some initial digging I decided that I wanted the following stack:

- [Yarn](https://yarnpkg.com/): Package manager.
- [Vite](https://vite.dev/): Build tool.
- [React](https://react.dev/): Core library/JSX language extension.
- [Material UI](https://mui.com/): React UI tools.
- [GitHub Pages](https://pages.github.com/): Hosting.

As far as I can tell, Yarn is somewhat similar to Hatch or Poetry in the Python
world, or perhaps Cargo for Rust. I'm not sufficiently well-versed in this
ecosystem to say definitively that Yarn is better than using plain `npm`
everywhere, but I certainly found it user-friendly and easy to get to grips
with!

I was super-impressed with Vite; I used it to quickly set up a template
repository, and found it incredibly useful for rapid prototyping. I've been
keeping a spare terminal open running `yarn run vite` (mapped to `yarn dev`),
which allows me to run a development build of the site in a web browser on my
second screen. Vite is incredibly responsive to changes in the repository --
the time between me saving a file and the website updating to account for it is
almost imperceptible. Once I'm happy to deploy, I can then run `yarn build` and
`yarn preview` to see what things will look like on GitHub pages (I caught a few
bugs here, such as image files that weren't being distributed properly).

React is the core of the project, serving as the core front-end library in which
I built most components of the website. The JSX language extension, which allows
HTML-like syntactic sugar for building nested components, really smoothed out
the whole process, though I suspect I'll need some further practice with things
like `useState` and `useEffect` before they'll start feeling more natural.

Material UI, or MUI for short, is a React-based framework that offers a large
selection of pre-built user-interface components (lists, buttons, icons, menu
bars, etc.). I imagine it would have taken ages to figure out how to build
things like that from scratch, and I could never have made things look so good.
The most powerful (yet most confusing) aspect MUI is the `sx` property on most
of its items. This allows you to attach CSS properties to individual components,
giving you a lot of freedom to design things exactly how you want them. As a
result, there's a lot of code like this in my project:

```jsx
<Box
  sx={{
    width: '100%', // Fill the screen or current container
    maxWidth: '50em', // ...but only up to a maximum width
    display: 'flex', // Adjust sizes dynamically
    justifyContent: 'space-between', // Spread contents out to fill space
    alignItems: 'center', // ...but centre on the secondary axis
    ml: { xs: 1, md: 3 }, // Left margin 1 on small screens, 3 otherwise
    mr: { xs: 1, md: 3 }, // Similarly for right margin
    mb: 2, // Bottom margin of 2
  }}
>
  {/* whatever you want to put in the box! */}
</Box>
```

I've been having some trouble wrapping my head around a lot of the `sx` options,
and by extension CSS itself. I haven't yet developed an intuition for how options
like `justifyContent`, `alignItems`, `flexDirection`, `flexGrow` and
`flexShrink` interact, so my solution has been to tinker until things work, save
the resulting object in a new React components called something like
`<CentreBox\>`, and then re-use it as much as I can. There are probably more
than a few redundant boxes scattered throughout the project because of an errant
`flexDirection` that I got the wrong way around, and instead of fixing it
properly I just put another box inside of it.

Finally, I chose GitHub Pages for hosting for a few reasons:

1. It's free and I'm a cheapskate.
1. It's really easy to get it set up.
1. Did I mention it's free?

I also know my way around GitHub Actions pretty well, so after a headstart
with Vite's docs, it was pretty straightforward to modify things so that
the project would test the build on pull requests but only deploy when
pushing to main.

### Markdown and JSX

After getting a front-page and my CV up and running, I decided to see if
I could get a blog going. Things got a little tricky here for a few reasons:

- GitHub Pages only allows static sites, so no dynamic data retrieval. The
  blog posts must be integral to the project itself.
- I could write a new JSX module for each new blog post, but that would
  massively complicate the process, and it would be hard to enforce a
  consistent style.
- Something like Markdown would be nicer for writing pages, but JavaScript
  doesn't support it by default.
- I'll be writing a bunch of code in this blog, and I'll need to figure
  out syntax highlighting if I want to have it look semi-decent.

The solution I came to has a few building blocks. First of all, the
JavaScript library [`gray-matter`](`https://www.npmjs.com/package/gray-matter`)
can be used to bundle up Markdown files into JSON files, and also allows you to add
_front-matter_. For example, the top of this file reads:

```markdown
---
title: Hello, World!
subtitle: Making a personal website with React.
published: 2025-05-08
---
```

`gray-matter` bundles this into a JSON object that looks like:

```json
{
  "data": {
    "title": "Hello, World!",
    "subtitle": "Making a personal website with React.",
    "published": " 2025-05-08T00:00:00.000Z"
  },
  "content": "...the rest of the file..."
}
```

I added a short script that scans the directory `./blog` for Markdown files,
writes them in JSON format to a directory inside the project, and auto-generates
a `.jsx` file that imports each JSON and re-exports them in an array. I then set
things up in my `package.json` so I can update the blog from my Markdown files
just by running `yarn blog`.

With the Markdown now accessible with self-describing tags in the JavaScript
portion of the project, the next step was to render it into blog posts. I found
two libraries to help with the process:

- [`react-markdown`](https://www.npmjs.com/package/react-markdown)
- [`react-syntax-highlighter`](https://www.npmjs.com/package/react-syntax-highlighter)

It's then remarkably easy to get things looking good. First I added this snippet
that takes the code portions of a Markdown file and applied syntax highlighting:

````jsx
// This is the highlighting engine itself.
import { Prism } from 'react-syntax-highlighter';
// Choose a style for the highlighting.
// Turns out they have my exact VSCode style!
import { xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism';

function highlight_syntax(props) {
  const { children, className } = props;
  // Read the language after the ```
  const match = /language-(\w+)/.exec(className || '');
  // If a match is found, use Prism to do the highlighting.
  // Otherwise, highlight with default colours.
  return match ? (
    <Prism language={match[1]} style={xonokai}>
      {children}
    </Prism>
  ) : (
    <code className={className}>{children}</code>
  );
}
````

You can then render the blog post content with:

```jsx
import Markdown from 'react-markdown';
function make_blog_post(markdown) {
  // `markdown` is the object created by gray-matter
  return (
    <Markdown components={{ code: highlight_syntax }}>
      {markdown.content}
    </Markdown>
  );
}
```

We're almost finished, but the routing was a bit of a challenge to figure out.
I also needed to update the URL pathing for each new blog entry. The solution
was to return a `<Routes>` object from `react-router-dom`, and generate all
of the pathing with a `.map(...)` call. Defining an object called `article`:

```jsx
article = {
  stem: '2025-01-01-name-of-blog-post',
  markdown: markdown_2025_01_01_name_of_blog_post, // from gray-matter
};
```

I found returning the following would automatically generate every blog
post and get the routing right:

```jsx
function BlogPages() {
  // BlogEntry is just something I made that gives you a
  // pretty header and keeps the text in a nice box.
  return (
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
```

Then, in `App.jsx`, I had to add the following to the top-level
router:

```jsx
    <Route path="/blog" element={<Blog />} />
    <Route path="/blog/*" element={<BlogPages />} />
    <Route path="*" element={<Error404 />} />
```

where `<Blog />` is the index page for the blog and `<Error404 />` is just a
page telling the user they've got the wrong URL.

I wish I could say, "That's everything!", but there are a few more details
I had to figure out to get everything working nicely. Check out the files
`scripts/update_blog.js` and everything under `src/pages/Blog.jsx` and
`src/pages/Blog/` in the [source code](https://github.com/LiamPattinson/liampattinson.github.io)
if you're interested.

### Future Plans

I already have a few ideas for how to improve things. It would be nice if this
blog could have a sidebar to aid navigation once you're already in an article,
but I'm not sure how best to get that working on mobile, as then you would want
it to disappear off the side of the screen until the user requested it. Some
previous/next buttons at the bottom would also be nice, and I haven't yet worked
out a good way to get images in here.

On the site as a whole, I'd quite like to change the homepage to a personal
dashboard. I imagine I could get pretty far just using public APIs, but for more
specialised data I might need to set up my own servers and a REST API. I've got
a couple of Raspberry Pis gathering dust at home, so that could be a fun hobby
project. I'd also like to add an image gallery for some other hobbies I have
going on. MUI has some really nice utilities for arranging images on a page.

For blog posts, I've been wanting to write up my experience of Advent of Code
2024 for a while now, plus I'd like to collect everything I've picked up about
bonkers iterator chaining in Rust (honestly my favourite part of the language).
I might also write up my Python development workflow at some point, as that
might be helpful to anybody who stumbles across this.
