const fs = require('fs/promises');
const path = require('path');

const folder = path.join(__dirname, 'styles');
const newFolder = path.join(__dirname, 'project-dist');

mergeCSS(folder, newFolder, 'bundle.css');

async function mergeCSS(folder, newFolder, fileName) {
  const files = await fs.readdir(folder, {withFileTypes: true});
  const cssFiles = files.filter(item => path.extname(item.name) === '.css' && !item.isDirectory());
  console.log(cssFiles);

  const content = await Promise.all(cssFiles.map(item => fs.readFile(path.join(folder, item.name))));
  // console.log(content.toString());

  await fs.writeFile(path.join(newFolder, fileName), content.join(`\n`));
}

exports.mergeCSS = mergeCSS;