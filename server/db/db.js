const mongoose = require('mongoose');

// Use Promises As Default
mongoose.Promise = global.Promise; 

// Connect To Mongoose
mongoose.connect('mongodb://127.0.0.1:27017/TodoApp', {useNewUrlParser: true});

module.exports.db = mongoose;