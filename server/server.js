const express = require('express');
const app = express();
const port = 3001
const cors = require('cors');
const bodyParser = require('body-parser');
const api = require('./routes/index');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.use('/api', api)
app.listen(port, ()=>console.log(`Listening on port ${port}`));