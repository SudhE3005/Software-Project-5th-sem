// Load express module
const { json } = require('express');
const express = require('express');
// Initialize app
const app = express();
const path = require('path');
const studentj=require('./student.json')
 var student=[
// {
//   "name": "Supraja",
//   "block": "LH4",
//   "room": "D11",
//   "city": "Chennai",
//   "reason": "Going home",
//   "ldate": "2022-11-26T00:00:00.000Z",
//   "rdate": "2022-11-26T00:00:00.000Z",
//   "status": '',
//   "completed": false,
//   "_id": "6381cee05d320856b6d4e3dc"
// }
]

// Route for home
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'public','student.html'));
    app.use(express.static(path.join(__dirname,'public/css/','student.css')));
    console.log(path.join(__dirname,'public/css/','student.css'))
});
app.get('/stoutpass.html', function (req, res) {
  res.sendFile(path.join(__dirname,'public','stoutpass.html'));
  app.use(express.static(path.join(__dirname,'public/css/','student.css')));
  console.log(path.join(__dirname,'public/css/','student.css'))

  // //Mongoose connection
  const mongoose = require('mongoose');
  mongoose.connect('mongodb://127.0.0.1/outpass');
  const db = mongoose.connection;

  // Check for DB connection
  db.once('open', function(){
      console.log("Connected to MongoDB successfully!");
  });
  var opmodel = require('./model_outpass.js');
  'use strict';

  const fs = require('fs');
  const bodyParser = require('body-parser');
  app.use(express.urlencoded({extended: true}));
  app.use(bodyParser.json()); 
  //HTML input into json
  app.post('/add', function(req, res){ 
      var opDetails = new opmodel({
            name: req.body.name,
            block: req.body.block,
            room: req.body.room,
            city: req.body.city,
            reason: req.body.reason,
            ldate: req.body.ldate,
            rdate: req.body.rdate,
            status: '',
            completed: false,
          });
      var x=require('./opjson.js');
      console.log(x)
      
        let da = JSON.stringify(opDetails, null, 2);
        var bodyJson = JSON.parse(da)
        console.log(da);
        student.push(opDetails)
        console.log(student)
        // var json = JSON.jsonify(student);
        const { writeFile, readFile } = require('fs');
        const path = './student.json';

  readFile(path, (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    const parsedData = JSON.parse(data);
    // console.log(data)
    parsedData.createdAt = new Date().toISOString();
    writeFile(path, JSON.stringify(student, null, 2), (err) => {
      if (err) {
        console.log('Failed to write updated data to file');
        return;
      }
      console.log('Updated file successfully');
    });
  });
      // fs.writeFileSync('student.json',json)
      // fs.readFile('student.json', 'utf8', function readFileCallback(err, data){
      //   if (err){
      //       console.log(err);
      //   } else {
      //   student = JSON.parse(data); //now it an object
      //   student.student.push(opDetails); //add some data
      //   json = JSON.stringify(student); //convert it back to json
      //   fs.writeFile ("student.json", JSON.stringify(data), function(err) {
      //     if (err) throw err;
      //     console.log('complete');
      //     }
      //   ); // write it back 
    // });
      // //Insert into Mongo
      // db.collection('outpass').insertOne(JSON.parse(da), function (err, result) {
      //   if (err)
      //     console.log(err)
      //   else
      //   {console.log('Outpass inserted');
      //   res.send('Success');}
      // });
    });
    mongoose.connection.close()
});
app.get('/stmess.html', function (req, res) {
  res.sendFile(path.join(__dirname,'public','stmess.html'));
  app.use(express.static(path.join(__dirname,'public/css/','student.css')));
  console.log(path.join(__dirname,'public/css/','student.css'))
});
app.get('/stcir.html', function (req, res) {
  res.sendFile(path.join(__dirname,'public','stcir.html'));
  app.use(express.static(path.join(__dirname,'public/css/','student.css')));
  console.log(path.join(__dirname,'public/css/','student.css'))
  const fs = require('fs');

  fs.readFile('./circular.json', 'utf8', (error, data) => {
     if(error){
        console.log(error);
        return;
     }
     console.log(JSON.parse(data))
    });
});
// Start server with port 3000
app.listen(3000, function(){
    console.log("Server started on localhost:3000");
});
