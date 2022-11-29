const mongoose = require('mongoose');
    var cirSchema =new mongoose.Schema({
        ctitle: String,
        csubtitle: String,
        clink: String,
    });

    let Post = module.exports = mongoose.model('circular', cirSchema);