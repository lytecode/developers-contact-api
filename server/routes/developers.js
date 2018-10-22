const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Hello dev api');
});

router.get('/developers', (req, res) => {
    res.send('hi developers');
});

module.exports = router;