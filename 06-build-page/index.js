const fs = require('fs/promises');
const path = require('path');
const { copyDir } = require('../04-copy-directory/index');
const { mergeCSS } = require('../05-merge-styles/index')

const newFolder = path.join(__dirname, 'project-dist');
const assetsFolder = path.join(__dirname, 'assets');
const styleFolder = path.join(__dirname, 'styles');
const componentsFolder = path.join(__dirname, 'components');
const templateFile = path.join(__dirname, 'template.html');

buildHTML();

async function buildHTML() {
  copyDir(assetsFolder, path.join(newFolder, 'assets'));
  mergeCSS(styleFolder, newFolder, 'style.css');

  const components = await fs.readdir(componentsFolder, {withFileTypes: true});
  const componentsHtml = components.filter(item => path.extname(item.name) === '.html');
  const componentsNames = componentsHtml.map(item => item.name);
  const componentsKeys = componentsNames.map(item => item.replace('.html', ''));
  console.log(componentsNames, componentsKeys);


  const templateContent = await fs.readFile(templateFile);

  await fs.writeFile(path.join(newFolder, 'index.html'), templateContent);

  // console.log(templateContent.toString());
}




