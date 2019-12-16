const fs = require('fs');
const myNewFile = './data/newFreebusy.txt';

function readNewFile(){
    return new Promise(resolve => {
      fs.readFile(myNewFile, 'utf8', (err, data) => {
        if(err) return resolve([]);
        return resolve(JSON.parse(data));
      })
    })
  }

  module.exports = readNewFile;