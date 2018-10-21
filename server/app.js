const express = require('express');

const app = express();


app.get('/', (req, res) => {
    res.send('Hello dev api');
});

app.listen(3000, () => console.log(`app started on port 3000 ...`));