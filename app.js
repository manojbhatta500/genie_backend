const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const userRoute = require('./routers/user_route');
const keyRoute = require('./routers/key_route');
const saveRoute = require('./routers/save_route');
const checkToken = require('./middlewares/auth');
require('dotenv').config();

const app = express();

app.use(bodyParser.json()); 
app.use(cors());

app.get('/test', (req, res) => {
    console.log('test route is working');
    res.send('Test route is working');
});

app.use('/key',keyRoute);


app.use('/user',userRoute);

app.use('/save',checkToken,saveRoute);
  


// server listening on port from env file and if it fails default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('server is running on port', PORT);
});
