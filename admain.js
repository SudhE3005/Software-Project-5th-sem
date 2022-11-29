// Load express module
const css= require('css');
// import { styles } from 'public/css/student.css';
const { json } = require('body-parser');
const express = require('express');
const { url } = require('inspector');
var formidable = require('formidable');
const fs = require('fs');
// Initialize app
const ejs=require('ejs')
const app = express();
const path = require('path');
var circular=[]
var opdata
app.set('view engine', 'ejs');
// Route for home
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'public','admin.html'));
    // app.use(express.urlencoded({extended: true}));
    app.use(express.static('./public'))
    app.use(express.static(__dirname));
});
app.get('/admess.html', function (req, res) {
    res.sendFile(path.join(__dirname,'public','admess.html'));
    app.use(express.static(path.join(__dirname,'public/css/','student.css')));
    // const dirPath = pathpages/index'.join(__dirname, "public");
    // const port = 3000;

    // const files = fs.readdirSync(dirPath).map(name => {
    // return {
    //     name: path.basename(name, ".html"),
    //     url: `/html/${name}`
    // };
    // });

    // app.set("view engine", "ejs");
    // app.use(express.static("public"));

    // app.get("/", (req, res) => {
    // res.render("index", { files });
    // });
    // app.use(
    //     express.static("public", {
    //       setHeaders: (res, filepath) =>
    //         res.attachment(`pdf-express-${path.basename(filepath)}`)
    //     })
    //   );

    // var Binary = require('mongodb').Binary;
    // var data = fs.readFileSync(req.body.file_path);
    // var insert_data = {};
    // insert_data.file_data= Binary(data);
    // var collection = db.collection('files');
    // collection.insertOne(insert_data, function(err, result){
    //     if(err)
    //         console.log(err)
    //     else
    //         console.log(result)
    // })
    // collection.findOne({}).toArray(function (err, documents) {
    //     if (err) console.error(err);
    //   fs.writeFile('file_name', documents[0].file_data.buffer, function(err){
    //       if (err) throw err;
    //       console.log('Sucessfully saved!');
    //   });
    // });
});
app.get('/window-child.html', function (req, res) {
    res.sendFile(path.join(__dirname,'public','window-child.html'));
    app.use(express.static(path.join(__dirname,'public/css/','student.css')));

    //HTML input into json
    const mongoose = require('mongoose');
    // mongoose.set({useUnifiedTopology: true});
    // mongoose.set({useNewUrlParser: true});
    // mongoose.connect('mongodb://127.0.0.1/circular')
    // ,{
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,   });

    mongoose.createConnection('mongodb://127.0.0.1:27017/circular')

      //.
//   catch(error => handleError(error));
    // const connectDB=async()=>{
    //     try{
    //         await mongoose.connect('mongodb://127.0.0.1/circular')
    //         console.log('MongoDB connected')
    //     }
    //     catch(err)
    //     {
    //         console.log('Failed to connect')
    //     }
    // }
    // connectDB()
//     mongoose
//   .connect('mongodb://127.0.0.1/circular')
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

    const db = mongoose.connection;

    //Check for DB connection
    db.once('open', function(){
        console.log("Connected to MongoDB successfully!");
    });
    var cirmodel = require('./model_cir.js');
    console.log(cirmodel)
    'use strict';

    const bodyParser = require('body-parser');
    app.use(express.urlencoded({extended: false}));
    app.use(express.json())
    app.post('/add', function(req, res){ 
        var cirDetails = new cirmodel({
                ctitle: req.body.ctitle,
                csubtitle: req.body.csubtitle,
                clink: req.body.clink,
            });
        var x=require('./cirjson.js');
        let da = JSON.stringify(cirDetails, null, 2);
        var bodyJson = JSON.parse(da)
        console.log(da);
        circular.push(cirDetails)
        console.log(circular)
        // var json = JSON.jsonify(student);
        const { writeFile, readFile } = require('fs');
        const path = './circular.json';

  readFile(path, (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    const parsedData = JSON.parse(data);
    // console.log(data)
    parsedData.createdAt = new Date().toISOString();
    writeFile(path, JSON.stringify(circular, null, 2), (err) => {
      if (err) {
        console.log('Failed to write updated data to file');
        return;
      }
      console.log('Updated file successfully');
    });
  });

    //     // console.log(da);
    //     circular.push(cirDetails)
    //   console.log(circular)
    //   // var json = JSON.jsonify(student);
    //   const { writeFile, readFile } = require('fs');
    //   const path = './circular.json';

    //    let usejson=readFile(path, (error, data) => {
    //     if (error) {
    //         console.log(error);
    //         return;
    //         }        
     });
    //     // let da = JSON.stringify(circular, null, 2);
    //     var bodyJson = JSON.parse(usejson)
    //     bodyJson.push(cirDetails)
    //     usejson=JSON.stringify(bodyJson)
    //     writeFile(path,usejson, (err) => {
    //         if (err) {
    //         console.log('Failed to write updated data to file');
    //         return;
    //         }
    //         console.log('Updated file successfully');
    //     });

    // })
    //     // window.close();
    //     //Insert into Mongo
    //     db.collection('circular').insertOne(JSON.parse(da), function (err, result) {
    //         if (err)
    //         console.log(err)
    //         else
    //         res.send('Success')
    //     });
    //     mongoose.connection.close();
    // });
    
});
app.get('/adcir.html', function (req, res) {
    res.sendFile(path.join(__dirname,'public','adcir.html'));
    app.use(express.static(path.join(__dirname,'public/css/','student.css')));
});
app.get('/adoutpass.html', function (req, res) {
  res.sendFile(path.join(__dirname,'public','adoutpass.html'),{data:opdata});
  app.use(express.static(path.join(__dirname,'public/css/','student.css')));
  console.log(path.join(__dirname,'public/css/','student.css'))

//   const MongoClient = require("mongoose");
//   const url = 'mongodb://127.0.0.1/';
//   const databasename = "outpass";  // Database name
//   MongoClient.connect(url).then((client) => {
    
//       const connect = client.db(databasename);
    
//       // Connect to collection
//       const collection = connect
//               .collection("outpass");
    
//       // Fetching the records having 
//       // name as saini
//      collection.find({}).toArray(function(err, items) {
//         if(err)
//             conole.log(err)
//         console.log(items);
//         res.send(items);
//         var x=require('./opjson.js')
//         console.log(x)
//     });
//   }).catch((err) => {
    
//       // Printing the error message
//       console.log(err.Message);
//   })

    // const mongoose = require('mongoose');
    // mongoose.connect('mongodb://127.0.0.1/outpass');
    // const db = mongoose.connection;
    // const posts = require('./posts');
    // app.get('/posts', posts);
//     MongoClient.connection.close();

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/outpass');
const db = mongoose.connection;

// Check for DB connection
db.once('open', function(){
    console.log("Connected to MongoDB successfully!");
});
var opmodel = require('./model_outpass.js');
'use strict';

// const fs = require('fs');
const bodyParser = require('body-parser');
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json()); 


const fs = require('fs');

fs.readFile('./student.json', 'utf8', (error, opdata) => {
     if(error){
        console.log(error);
        return;
     }

     console.log(JSON.parse(opdata));
    // res.render("adoutpass.ejs",{data:opdata});
})
    // const posts = require('./posts');
    // app.get('/posts', posts);
    // mongoose.connection.close();




// let val= db.collection('outpass').find({}).toArray.then(data=>data).catch(err=>err);
// {},function(err, items) {
        //   if(err)
        //         conole.log(err)
        //     console.log(items);
        //     res.send(items);
        //     var x=require('./opjson.js')
        //     console.log(x)})
    //     }).catch((err) => {
        
    //       // Printing the error message
    //       console.log(err.Message);
    //   })
    // val.each(function(err, val) {
    //     if (err) return cb(err);
    //     console.log(val);
    // });
// console.log(val);
//HTML input into json
// app.post('/add', function(req, res){ 
//     var opDetails = new opmodel({
//           name: req.body.name,
//           block: req.body.block,
//           room: req.body.room,
//           city: req.body.city,
//           reason: req.body.reason,
//           ldate: req.body.ldate,
//           rdate: req.body.rdate,
//           status: '',
//           completed: false,
//         });
//     var x=require('./opjson.js');
//     console.log(x)
//     let da = JSON.stringify(opDetails, null, 2);
//     var bodyJson = JSON.parse(da)
//     console.log(da);
//     //Insert into Mongo
//     db.collection('outpass').find({}, function (err, result) {
//       if (err)
//         console.log(err)
//       else
//       {console.log('Outpass inserted');
//       res.send('Success');}
//     });
//   });
//   mongoose.connection.close()
});

// Start server with port 3000
app.listen(3000, function(){
    console.log("Server started on localhost:3000");
});
