const express = require('express');
const router = require('./routes');

const app = express();


app.get('/', (req, res) => {
    res.send('Hello dev api');
});

app.use('/api/v1/', router);

const port = process.env.PORT || 3000;