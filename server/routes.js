const express = require('express');
const router = express.Router();


router.get('/developers', (req, res) => {
    res.send('hi developers');
});

module.exports = router;