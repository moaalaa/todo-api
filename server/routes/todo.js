const express = require('express');
const router = express.Router();

router.get('/todos', (req, res) => {
    res.json("Todos")
})

module.exports = router;