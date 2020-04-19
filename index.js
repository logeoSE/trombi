const express = require('express');
const app = express();

const csv = require('csv-parser')
const fs = require('fs')
const persons= [];

const _ = require('lodash');
 
fs.createReadStream('data/persons.csv')
  .pipe(csv(["TEAM","LOGIN","NOM","PRENOM","NAISSANCE","ARRIVEE","FONCTION","MAIL","SKYPE","FIXE","PORTABLE","MANAGER","ROOM"]))
  .on('data', (data) => persons.push(data))
  .on('end', () => {
    console.log(persons);
  });

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

app.get('/persons', function (req, res) {
  if(req.query.nom){
    var item = _.find(persons,{'NOM' : req.query.nom});
    if(!item){
      res.status(404);
    }
    res.json(item);
  } else {
    res.json(persons);
  }
});

