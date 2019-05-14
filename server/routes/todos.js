// Modules
const express = require('express');
const router = express.Router();

// Models
const {Todo} = require('~models/Todo');

router.get('/', (req, res) => {
    res.json("Todos")
})

router.post('/', (req, res) => {
    const todo = new Todo(req.body);

    todo.save()
        .then(doc => res.status(201).send(doc))
        .catch(e => res.status(400).send(e))
});

module.exports = router;


