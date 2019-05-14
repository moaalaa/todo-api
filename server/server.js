// Modules 
const express = require('express');
const bodyParser = require('body-parser');
const responseEnhancer = require('express-response-formatter')
require('express-group-routes');

// DB
const {db} = require('~db/db');

// Models
const {User} = require('~models/User');

// Init Express App
const app = express();

// Use Body Parser 
app.use(bodyParser.json())

// Add formatter functions to "res" object via "responseEnhancer()"
app.use(responseEnhancer())

// Routes
const todos = require('~routes/todos');

// Route Group
app.group('/api', (router) => {
    
    // Todos Route
    router.use('/todos', todos)
})

// Start Http Server
app.listen(3000, () => {
    console.log("Server Started on Port 3000");
});