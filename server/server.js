// Modules 
const express = require('express');
const bodyParser = require('body-parser');
require('express-group-routes');

// DB
const {db} = require('./db/db');

// Models
const {Todo} = require('./Models/Todo');
const {User} = require('./Models/User');

// Init Express App
const app = express();

// Use Body Parser 
app.use(bodyParser.json())

// Routes

app.group('/api', (router) => {
    router.post('/todos', (req, res) => {
        const todo = new Todo(req.body);
        
        todo.save()
            .then(doc => res.status(201).send(doc))
            .catch(e => res.status(400).send(e))
    });
})



// Start Http Server
app.listen(3000, () => {
    console.log("Server Started on Port 3000");
});