'use strict'
//import readFile
const read = require('./freebusy');
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
   // console.log('slldata ', allData);
    
    
    //function get a single employeeId 
    const getId = (id) => allData.filter(e =>e.id ===id);
   //function get multi employeesid 
    const getMultiIds =(ids)=> {
        let multiId = allData.filter(e => e.id);
        let getIds =[];
        for(let i in ids){
            getIds.push(multiId.filter(e => e.id === ids[i]));
        }
        return getIds;
    };

    //function get a singel employeesName
    let getName = (name) => allData.filter(e => e.name ===name);
    //function get multiName
      
    let getMultinames =(names) =>{
        let multiNames = allData.filter(e => e.name);
        let getNames = [];
        for(let i in names){
            getNames.push(multiNames.filter(e => e.name === names[i]));
        }
        return getNames;
    };
 
//get all participants
    app.get('/api/all', (req, res) => {
        res.send(allData);
    });

    //get single id 
    app.get('/api/id/:id', (req, res)=>{
        const result = getId(req.params.id);
       // console.log('result', result)
        if( !result) res.status(404).send('the id was not found');//404
        res.send(result);
    })
  //get multi id  (this case can get 3 employees)
  app.get('/api/ids/:id/:id2/:id3', (req, res, next)=>{
    const result = getMultiIds(req.params);
    console.log('result', result)
    if( !result) res.status(404).send('The id was not found');//404
    res.send(result);
    next();
})

 //get single name
 app.get('/api/name/:name', (req, res)=>{
    const result = getName(req.params.name);
   // console.log('result', result)
    if( !result) res.status(404).send('the name was not found');//404
    res.send(result);
})

//get multi Names (this case can get 3 employees)
app.get('/api/names/:name/:name2/:name3', (req, res, next)=>{
    const result = getMultinames(req.params);
    console.log('result', result)
    if( !result) res.status(404).send('The id was not found');//404
    res.send(result);
    next();
})
    app.listen(PORT, err => {
        if (err) {
            return console.log(err);
        }
        console.log(`Server started on http://localhost:${PORT}`);
    })
})

