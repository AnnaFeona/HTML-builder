const fs = require('fs');
const path = require('path');
const fileName = path.join(__dirname, 'text.txt');
const inputStream = fs.createReadStream(fileName);

inputStream.on('data', (chunk) => {
  // let data = stream.read();
  console.log(chunk.toString());
});