// Modules
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const {ObjectID} = require('mongodb');

// Models
const {User} = require('~models/User');

// Read All Users
router.get('/', (req, res) => {
    
    res.json({message: 'all users'})
});

// Create New Users
router.post('/', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);

    user.save()
        .then(user =>  user.generateAuthToken())
        .then(token => {
            res.header('Authorization', `Bearer ${token}`).send(user)
        })
        .catch(e => res.status(400).json({messages: e}))
});

// Read Single Users
router.get('/:id', (req, res) => {
    
});

// Update Single Todo
router.patch('/:id', (req, res) => {
    
});

// Delete Single Todo
router.delete('/:id', (req, res) => {
    
});

module.exports = router;


