const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/:fileName', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public', req.params.fileName));
});

module.exports = router;