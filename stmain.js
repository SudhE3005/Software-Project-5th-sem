// Load express module
const express = require('express');

// Initialize app
const app = express();
const path = require('path');

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
  //Mongoose connection
  const mongoose = require('mongoose');
  mongoose.connect('mongodb://127.0.0.1/outpass');
  const db = mongoose.connection;

  // Check for DB connection
  db.once('open', function(){
      console.log("Connected to MongoDB successfully!");
  });

  var router= express.Router()
  var opSchema =new mongoose.Schema({
    name: String,
    block: String,
    room: String,
    city: String,
    reason: String,
    ldate: Date,
    rdate: Date,
    status: Boolean,
    completed: Boolean,
  });
  
  var opmodel = mongoose.model('outpass', opSchema);
  console.log(opmodel);

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
    function handleSubmit(event) {
      event.preventDefault();

      const data = new FormData(event.target);

      const value = Object.fromEntries(data.entries());

      value.topics = data.getAll("topics");

      console.log({ value });

    }
    let da = JSON.stringify(opDetails, null, 2);
    var bodyJson = JSON.parse(da)
    console.log(da);
    //Insert into Mongo
    db.collection('outpass').insertOne(JSON.parse(da), function (err, result) {
        if (err)
          console.log(err)
        else
        {console.log('Outpass inserted');
         res.send('Success');
      });
    });

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
});
// Start server with port 3000
app.listen(3000, function(){
    console.log("Server started on localhost:3000");
});

