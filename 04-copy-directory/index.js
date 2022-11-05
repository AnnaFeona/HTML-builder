const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'files');
const newFolder = path.join(__dirname, 'files-copy');

copyDir (folder, newFolder);

function copyDir (folder, newFolder) {
  // fs.rmdir(newFolder);
  fs.mkdir(newFolder, {recursive: true}, (err) => {
    if (err) {
      console.log(err.message);
    }

    console.log('Directory created successfully!');
    fs.readdir(folder, {withFileTypes: true}, (err, items) => {
      if (err) {
        console.log(err.message);
      }
      items.forEach(item => {
        if (item.isDirectory()) {
          copyDir(path.join(folder, item.name), path.join(newFolder, item.name));
        } else {
          fs.copyFile(path.join(folder, item.name), path.join(newFolder,  item.name), (err) => {
            if (err) {
              console.log(err.message);
            }
            // if (!item.isDirectory()) {
            //   console.log('File ' + item.name + ' copied.');
            // }
          })
        }
      })
    })
  })
  // console.log('Files have been copied sucsessfully!')
}