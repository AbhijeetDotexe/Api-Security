const express = require('express');
const router = express.Router();

router.get('/test1', (req, res) => {
    res.json({ message: 'This endpoint is just for testing ,Endpoint 1' });
});

router.get('/test2', (req, res) => {
    res.send({ message: 'This endpoint is also just for testing, Endpoint 2' });
});

module.exports = router;
