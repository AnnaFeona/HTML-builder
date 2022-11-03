const fs = require('fs');
const path = require('path');
const { stdout } = require('process');

const secretFolder = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolder, {withFileTypes: true} , (err, files) => {
  if (err) throw err;
  files.forEach(item => {
    if (!item.isDirectory()) {
      const fileSize = fs.stat(path.join(secretFolder, item.name), (err, el) => {
        const fileExt = path.extname(item.name);
        const fileName = path.basename(item.name, fileExt);
        const fileSize = el.size / 1000;

        console.log(fileName + ' - ' + fileExt.replace('.','') + ' - ' + fileSize + ' kb');
      });
    }
  });
})