// Modules 
const express = require('express');
const bodyParser = require('body-parser');
require('express-group-routes');

// DB
const {db} = require('~db/db');

// Models
const {User} = require('~models/User');

// Init Express App
const app = express();

// Port
let port = process.env.NODE_PORT || 3000;

// Use Body Parser 
app.use(bodyParser.json())

// Routes
const todos = require('~routes/todos');
const users = require('~routes/users');

// Route Group
app.group('/api', (router) => {
    
    // Todos Route
    router.use('/todos', todos)

    // Users Route
    router.use('/users', users)
})

// Start Http Server
app.listen(port, () =>  console.log("Server Started on Port 3000"));