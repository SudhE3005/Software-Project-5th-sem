const mongoose = require('mongoose');
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
let Post = module.exports = mongoose.model('outpass', opSchema);