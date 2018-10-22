const express = require('express');
const router = require('./routes');

const app = express();



app.use('/api/v1/', router);



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app started on port ${port} ...`));