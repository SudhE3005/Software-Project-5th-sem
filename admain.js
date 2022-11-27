// Load express module
const css= require('css');
// import { styles } from 'public/css/student.css';
const { json } = require('body-parser');
const express = require('express');
const { url } = require('inspector');
const fs = require('fs');
// Initialize app
const app = express();
const path = require('path');

// Route for home
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'public','admin.html'));
    app.use(express.urlencoded({extended: true}));
    app.use(express.static(fs.readFile(path.join(__dirname,'public','css','student.css'), function(err,data){
        if(err)
            console.log(err)
        else
            console.log(data)
    })));
    // var styles = "@import url(' ..public/css/student.css ')";;
    // console.log(styles);
    // app.use(express.static(styles));
});
app.get('/admess.html', function (req, res) {
    res.sendFile(path.join(__dirname,'public','admess.html'));
    app.use(express.static(path.join(__dirname,'public/css/','student.css')));
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://127.0.0.1/mess');
    const db = mongoose.connection;

    // Check for DB connection
    db.once('open', function(){
        console.log("Connected to MongoDB successfully!");
    });

    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var router= express.Router()
    var mSchema =new mongoose.Schema({
        month: String, //month[new Date().getMonth()-1],
        year: Number, //new Date().getUTCFullYear(),
        fees: File,
    });
    
    var messmodel = mongoose.model('mess', mSchema);
    console.log(messmodel);

    'use strict';

    const fs = require('fs');
    const bodyParser = require('body-parser');
    app.use(express.urlencoded({extended: true}));
    app.use(bodyParser.json()); 
    //HTML input into json
    app.post('/admess.html', function(req, res){ 
        var mDetails = new messmodel({
                month: month[new Date().getMonth()-1],
                year: new Date().getUTCFullYear(),
                fees: req.body.filename,
            });
        function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        const value = Object.fromEntries(data.entries());

        value.topics = data.getAll("topics");

        console.log({ value });

        }
        let da = JSON.stringify(cirDetails, null, 2);
        var bodyJson = JSON.parse(da)
        console.log(da);
        //Insert into Mongo
        db.collection('mess').insertOne(JSON.parse(da), function (err, result) {
            if (err)
            console.log(err)
            else
            res.send(window.alert("Success"))
        });
        });

});
app.get('/window-child.html', function (req, res) {
    res.sendFile(path.join(__dirname,'public','window-child.html'));
    app.use(express.static(path.join(__dirname,'public/css/','student.css')));

    const mongoose = require('mongoose');
    mongoose.connect('mongodb://127.0.0.1/circular');
    const db = mongoose.connection;

    // Check for DB connection
    db.once('open', function(){
        console.log("Connected to MongoDB successfully!");
    });

    var router= express.Router()
    var cirSchema =new mongoose.Schema({
        card_title: String,
        card_subtitle: String,
        card_link: String,
    });
    
    var cirmodel = mongoose.model('circular', cirSchema);
    console.log(cirmodel);

    'use strict';

    const bodyParser = require('body-parser');
    app.use(express.urlencoded({extended: true}));
    app.use(bodyParser.json()); 
    //HTML input into json
    app.post('/window-child.html', function(req, res){ 
        var cirDetails = new cirmodel({
                card_title: req.body.c_title,
                card_subtitle: req.body.c_subtitle,
                card_link: req.body.c_link,
            });
        function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        const value = Object.fromEntries(data.entries());

        value.topics = data.getAll("topics");

        console.log({ value });

        }
        let da = JSON.stringify(cirDetails, null, 2);
        var bodyJson = JSON.parse(da)
        console.log(da);
        //Insert into Mongo
        db.collection('circular').insertOne(JSON.parse(da), function (err, result) {
            if (err)
            console.log(err)
            else
            res.send(window.alert("Success"))
        });
        });
});
app.get('/adcir.html', function (req, res) {
    res.sendFile(path.join(__dirname,'public','adcir.html'));
    app.use(express.static(path.join(__dirname,'public/css/','student.css')));


    

});
app.get('/adoutpass.html', function (req, res) {
  res.sendFile(path.join(__dirname,'public','adoutpass.html'));
  app.use(express.static(path.join(__dirname,'public/css/','student.css')));
  console.log(path.join(__dirname,'public/css/','student.css'))

  const MongoClient = require("mongoose");
  const url = 'mongodb://localhost:27017/';
  const databasename = "nodemongo";  // Database name
  MongoClient.connect(url).then((client) => {
    
      const connect = client.db(databasename);
    
      // Connect to collection
      const collection = connect
              .collection("nodemongo");
    
      // Fetching the records having 
      // name as saini
      collection.find({})
          .toArray().then((ans) => {
              console.log(ans);
          });
  }).catch((err) => {
    
      // Printing the error message
      console.log(err.Message);
  })
});

// Start server with port 3000
app.listen(3000, function(){
    console.log("Server started on localhost:3000");
});