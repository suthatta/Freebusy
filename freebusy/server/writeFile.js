const fs = require('fs');
const myNewFile = './data/newFreebusy.txt';

function writeFile(data){
        return new Promise((resolve, reject)=>
        fs.writeFile(myNewFile, JSON.stringify(data),(err, data) => err ? reject(err) : resolve(data))
        );
};

module.exports = writeFile;
  