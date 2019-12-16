'use strict'
const fs = require('fs');
const myFile = './data/CopyFreebusy.txt';
const writeFile = require('./writeFile')

//declare lineByLine to read text file line by line
//install readlines

function read(onEnd) {
  let myMap = new Map();

  console.log("read() - called")

  const linebyline = require('linebyline')
  const eventEmitter = linebyline(myFile);

  eventEmitter.on('line', function (line, lineCount) {
    // do something with the line of text
   
    const columns = line.split(';');

    if (columns.length === 2) {
      const id = columns[0];
      const name = columns[1];

      let empData = myMap.get(id)
      if (empData == null) {
        empData = { "id" : id}
        myMap.set(id, empData);
      }
      empData["name"] = name

      console.log("id " + id + " => ", name);
     // logger.write(id, name);


    } else {
      const columns = line.split(';');
      const id = columns[0];
      const start = columns[1];
      const end = columns[2]

      let empData = myMap.get(id)
      if (empData == null) {
        empData = { "id": id }
        myMap.set(id, empData);
      }
      let busy = empData["busy"]
      if (busy == null) {
        busy = []
        empData["busy"]=busy
      }
      busy.push({ "start":start, "end":end })

      console.log("id " + id + " => ", busy);
    //  logger.write(id, start, end);

    }
  

  })
    .on('error', function (e) {
      // something went wrong
      console.log('error', e)
    })
    .on('end', function() {
      console.log("end - data:", myMap)

      if (onEnd) {
        // call callback with data
  
        onEnd(myMap) 
     
      }
    })

    console.log("read() - finished")
   
}

module.exports = read;