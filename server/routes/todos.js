// Modules
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const {ObjectID} = require('mongodb');

// Models
const {Todo} = require('~models/Todo');

// Middleware
const {auth} = require('~middleware/auth');

// Read All Todos
router.get('/', auth, (req, res) => {
    
    Todo.find({
        _owner: req.user._id
    })
        .then(docs => res.json({data: docs}))
        .catch(e => res.status(500).json({messages: e}))
});

// Create New Todos
router.post('/', auth, (req, res) => {
    const body = _.assign(req.body, {_owner: req.user._id});
    
    Todo.create(body)
        .then(doc => res.status(201).json({data: doc}))
        .catch(e => res.status(400).json({messages: e}))
});

// Read Single Todos
router.get('/:id', auth, (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).json({messages: 'Not Found'});
    }
    
    Todo.findOne({
        _id: id,
        _owner: req.user._id
    })
        .then(doc => {
            if (!doc) {
                res.status(404).json({messages: 'Not Found'});

            }

            res.status(200).json({data: doc});
        })
        .catch(e => res.status(500).json({messages: e}))
});

// Update Single Todo
router.patch('/:id', auth, (req, res) => {
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
    Todo.findOneAndUpdate({ _id: id, _owner: req.user._id },  { $set: body },  { new: true })
        .then(doc => {
            if (!doc) {
                res.status(404).json({messages: 'Not Found'});

            }

            res.status(200).json({data: doc});
        })
        .catch(e => res.status(500).json({messages: e}))
});

// Delete Single Todo
router.delete('/:id', auth, (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).json({messages: 'Not Found'});
    }

    Todo.findOneAndRemove({
        _id: id,
        _owner: req.user._id
    })
        .then(doc => {
            if (!doc) {
                res.status(404).json({messages: 'Not Found'});

            }

            res.status(200).json({data: doc});
        })
        .catch(e => res.status(500).json({messages: e}))
});

module.exports = router;


