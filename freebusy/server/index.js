'use strict'
//import readFile
const read = require('./freebusy');
const fs = require('fs');
//const readNewFile = require('./freebusy');
//const writeData = require('./freebusy');

const express = require('express');
const bodyParse = require("body-parser");
const app = new express();

const PORT = process.env.PORT || 4000;

//Sett up body-parsers
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));

let data = null;

app.use(function (req, res, next) {
    console.log('Incoming Request');
    next();
});

app.get('/', (req, res) => {res.send('HomePage');});
   
app.use((err, req, res, next) => {
    res.status(500).send({ err });
});


read(function (d){
    data =d
   
   // console.log("data on port", data)
 
    // start to listen after data has been read
    app.get('/list', (req, res) => {
        let values = [...data.values()]
        // console.log('values',values)
       values.forEach(element => {
           console.log('element',element)
           res.json(element);
           res.end();
    })                              
    })
//get all participants
    app.get('/all', (req, res) => {
        let values = [...data.values()]
        res.send(values);
    });

    app.listen(PORT, err => {
        if (err) {
            return console.log(err);
        }
        console.log(`Server started on http://localhost:${PORT}`);
    })
})
 
