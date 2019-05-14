// Modules
const express = require('express');
const router = express.Router();
const {ObjectID} = require('mongodb');

// Models
const {Todo} = require('~models/Todo');

// Resource Manager
const responder = require('~resources/basicResource')

// Read All Todos
router.get('/', (req, res) => {
    
    Todo.find()
        .then(docs => res.formatter.ok(docs))
        .catch(e => res.formatter.serverError(e))
});

// Create New Todos
router.post('/', (req, res) => {
    Todo.create(req.body)
        .then(doc => res.formatter.created(doc))
        .catch(e => res.formatter.badRequest(e))
});

// Read Single Todos
router.get('/:id', (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.formatter.notFound("Not Found");
    }
    
    Todo.findById(id)
        .then(doc => {
            if (!doc) {
                res.formatter.notFound("Not Found");

            }

            res.formatter.ok(doc)
        })
        .catch(e => res.formatter.serverError(e))
});

module.exports = router;


