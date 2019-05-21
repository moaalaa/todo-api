const mongoose = require('mongoose');

// Use Promises As Default
mongoose.Promise = global.Promise; 

// Connect To Mongoose
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

module.exports.db = mongoose;