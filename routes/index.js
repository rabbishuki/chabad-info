const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/:fileName', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../ads', req.params.fileName));
});

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

module.exports = router;