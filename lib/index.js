const fs = require('fs-extra');
const process = require('process');
const signale = require('signale');

const { slugify, validateInput } = require('./utils');

const FILENAME = 'index.md';
const RELATIVE_POST_DIR = '/src/posts/';
const ABSOLUTE_POST_DIR = process.cwd() + RELATIVE_POST_DIR;

module.exports = async () => {
  const title = validateInput(process.argv[2])
    ? process.argv[2].toString()
    : null;

  // Exit if no valid title argument is passed
  if (!title) {
    signale.fatal('Error: Invalid title.');
    process.exit();
  }

  const slug = slugify(title);
  const date = new Date().toISOString();
  const path = `/${slug}/`;

  const frontmatter =
    `---\n` +
    `title: "${title}"\n` +
    `date: "${date}"\n` +
    `path: "${path}"\n` +
    `---\n`;

  signale.pending(`Attempting to create post titled "${title}"...`);

  // Exit if the folder already exists
  if (fs.existsSync(ABSOLUTE_POST_DIR + slug)) {
    signale.fatal(`Error: Blog post at '/${slug}/' already exists.`);
    process.exit();
  } else {
    try {
      fs.outputFileSync(
        `${ABSOLUTE_POST_DIR}/${slug}/${FILENAME}`,
        frontmatter,
      );
      signale.success(`Blog post created at '/${slug}/'`);
    } catch (error) {
      signale.fatal(new Error(`Error creating blog post:\n${error.message}`));
    }
  }
};
