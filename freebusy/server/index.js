'use strict'
//import readFile
const read = require('./freebusy');
const fs = require('fs');


const express = require('express');
const bodyParse = require("body-parser");
const app = new express();

const PORT = process.env.PORT || 4000;

//Sett up body-parsers
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));

let data = null;
//calls when request from url
app.use(function (req, res, next) {
    console.log('Incoming Request');
    next();
});

app.get('/', (req, res) => {res.send('HomePage Freebusy meeting');});
   
app.use((err, req, res, next) => {
    res.status(500).send({ err });
});

//start to run application
read(function (d){
    // program will run the data line by line (about 10240 rows)
    data =d
    // store data in values 
    let values = [...data.values()]
    //grouping data by id
    let allData = values.map(items => items).filter(id => id);
    //console.log('slldata ', allData);

    let multiIds;
    let multinames;
 
    // start to listen after data has been read
    app.get('/list', (req, res) => {
        allData.forEach(element => {
           console.log('element',element)
           res.json(element);
           res.end();
    })                              
    })
//get all participants
    app.get('/api/all', (req, res) => {
        res.send(allData);
    });

    //get single id 
    app.get('/api/:id', (req, res)=>{
        const result = allData.find(items => items.id === req.params.id);
       // console.log('result', result)
        if( !result) res.status(404).send('the id was not found');//404
        res.send(result);
    })
  //get multi id 
  app.get('/api/ids', (req, res)=>{
    const result = allData.find(items => items.id === req.params);
    console.log('result', result)
    if( !result) res.status(404).send('The id was not found');//404
    res.send(result);
})

 //get single name
 app.get('/api/name/:name', (req, res)=>{
    const result = allData.find(items => items.name === req.params.name);
    console.log('result name', result)
    if( !result) res.status(404).send('The name was not found');//404
    res.send(result);
})

    app.listen(PORT, err => {
        if (err) {
            return console.log(err);
        }
        console.log(`Server started on http://localhost:${PORT}`);
    })
})