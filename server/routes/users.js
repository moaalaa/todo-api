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
        .then(token => res.header('Authorization', `Bearer ${token}`).send(user))
        .catch(e => res.status(400).json({messages: e}));
});

// Login Users
router.post('/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    
    User.findByCredentials(body.email, body.password)
        .then(user => {
            return user.generateAuthToken()
                .then(token => res.header('Authorization', `Bearer ${token}`).send(user))
        })
        .catch(e => res.status(404).json({messages: e}));
});

// Profile Users
router.get('/me', auth, (req, res) => {
    res.send(req.user);
});

// logout Users
router.delete('/me/token', auth, (req, res) => {
    req.user.removeToken(req.token)
        .then(() => res.status(200).send())
        .catch(e => res.status(400).json({messages: e}));
});

module.exports = router;


