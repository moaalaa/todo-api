// Modules
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const {ObjectID} = require('mongodb');

// Models
const {Todo} = require('~models/Todo');

// Read All Todos
router.get('/', (req, res) => {
    
    Todo.find()
        .then(docs => res.json({data: docs}))
        .catch(e => res.status(500).json({messages: e}))
});

// Create New Todos
router.post('/', (req, res) => {
    Todo.create(req.body)
        .then(doc => res.status(201).json({data: doc}))
        .catch(e => res.status(400).json({messages: e}))
});

// Read Single Todos
router.get('/:id', (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).json({messages: 'Not Found'});
    }
    
    Todo.findById(id)
        .then(doc => {
            if (!doc) {
                res.status(404).json({messages: 'Not Found'});

            }

            res.status(200).json({data: doc});
        })
        .catch(e => res.status(500).json({messages: e}))
});

// Update Single Todo
router.patch('/:id', (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).json({messages: 'Not Found'});
    }

    let body = _.pick(req.body, ['text', 'completed'])

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    // Return New Document
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then(doc => {
            if (!doc) {
                res.status(404).json({messages: 'Not Found'});

            }

            res.status(200).json({data: doc});
        })
        .catch(e => res.status(500).json({messages: e}))
});

// Delete Single Todo
router.delete('/:id', (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).json({messages: 'Not Found'});
    }

    Todo.findByIdAndRemove(id)
        .then(doc => {
            if (!doc) {
                res.status(404).json({messages: 'Not Found'});

            }

            res.status(200).json({data: doc});
        })
        .catch(e => res.status(500).json({messages: e}))
});

module.exports = router;


