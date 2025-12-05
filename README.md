# liampattinson.github.com

My personal webpage, and a space I'm using to learn a little web-dev.

This site uses [React](https://react.dev/) with assets from
[Material UI](https://mui.com/material-ui/).

## Usage

I use [Yarn](https://yarnpkg.com/) to manage the project, but the steps below
will also work by replacing `yarn` with `npm run`.

All developer dependencies are listed in `package.json`, and setup for various
tools can be found in `*.config.js` files.

To install all dependencies, use:

```bash
yarn install
```

Using [Vite](https://vite.dev/), a local development version of the site can be
deployed with:

```bash
yarn dev
```

A production build can be created and previewed with:

```bash
yarn build
yarn preview
```

The code is linted with [ESLint](https://eslint.org/) and formatted with
[Prettier](https://prettier.io/). The two tools are integrated, so style
violations will be picked up by ESLint. To lint the code, use:

```bash
yarn lint [--fix]
```

Providing `--fix` will auto-fix most issues. To format the code without
linting:

```bash
yarn format
```

To add new blog posts, create a new markdown file in the top-level `blog/`
directory, and run:

```bash
yarn blog
```

## Q&A

> Why not use [insert static site template] like a sensible person?

It's more fun this way.

## License

All material licensed under [MIT](LICENSE).
