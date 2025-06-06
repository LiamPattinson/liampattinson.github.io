'use strict';

import fs from 'fs';
import matter from 'gray-matter';

let markdowns = [];
let imports = [];
let stems = [];

for (const fileName of fs.readdirSync('blog')) {
  const [stem, ext] = fileName.split('.');
  if (ext === 'md') {
    const file = matter(fs.readFileSync(`blog/${fileName}`, 'utf8'));
    fs.writeFileSync(
      `src/pages/Blog/articles/${stem}.json`,
      JSON.stringify(file)
    );
    const markdown = `article_${stem.replace(/[- ]/g, '_')}`;
    markdowns.push(markdown);
    imports.push(`import ${markdown} from './articles/${stem}.json';`);
    stems.push(stem);
  }
}

const articles_js = `
// This file is auto-generated by scripts/update_blog.js.
// Do not edit this file directly.
${imports.join('\n')}

const articles = [
  ${markdowns
    .map((markdown, i) => {
      let entry = `{'markdown': ${markdown}, 'stem': '${stems[i]}'}`;
      return entry;
    })
    .join(',\n  ')},
];

export default articles;
`;

fs.writeFileSync(`src/pages/Blog/articles.jsx`, articles_js);
