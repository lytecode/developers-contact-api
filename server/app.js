const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/developers');
const app = express();


//middlewares
app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1/', router);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app started on port ${port} ...`));


module.exports = app; //for testing