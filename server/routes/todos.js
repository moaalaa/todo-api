// Modules
const express = require('express');
const router = express.Router();

// Models
const {Todo} = require('~models/Todo');

// Resource Manager
const responder = require('~resources/basicResource')

router.get('/', (req, res) => {
    
    Todo.find()
        .then(docs => responder.api(docs).res(res))
        .catch(e => responder.error(e).res(res))
})

router.post('/', (req, res) => {
    const todo = new Todo(req.body);

    todo.save()
        .then(doc => responder.api(doc, null, 201).res(res))
        .catch(e => responder.error(e, 400).res(res))
});

module.exports = router;


