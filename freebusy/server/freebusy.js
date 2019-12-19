'use strict'
const fs = require('fs');
const myFile = './data/freebusy.txt';

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

     // console.log("id " + id + " => ", name);

    } else {
      const columns = line.split(';');
      const id = columns[0];
      const start = columns[1];
      const end = columns[2]
      const busytime = new Date(end).getTime() - new Date(start).getTime();
      const busyminites = Math.round(busytime / 1000 /60);
      const busyHour = timeConvert(busyminites);

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
   

      busy.push({ "start":start, "end":end , "busyHour":busyHour})
      //let dates = new Date(busy.start).toLocaleString();
     // let busytime = new Date(busy.end).getTime() - new Date(busy.start).getTime();
     // let minutes = Math.round(busytime / 1000 /60);
     // console.log("id " + id + " => ", busy);
  //   console.log("id " + id + " => ", busy);

    }
  })
    .on('error', function (e) {
      // something went wrong
      console.log('error', e)
    })
    .on('end', function() {
    //  console.log("end - data:", myMap)

      if (onEnd) {
        // call callback with data
  
        onEnd(myMap) 
     
      }
    })

    console.log("read() - finished")
   
}

function timeConvert(n) {
  var num = n;
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return num + " minutes = " + rhours + " hour(s) and " + rminutes + " minute(s).";
  }
module.exports = read;