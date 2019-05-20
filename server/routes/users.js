// Modules
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const {ObjectID} = require('mongodb');

// Models
const {User} = require('~models/User');

// Middleware
const {auth} = require('~middleware/auth');

// Register New Users
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

// Profile Users
router.get('/me', auth, (req, res) => {
    res.send(req.user);
});

module.exports = router;


