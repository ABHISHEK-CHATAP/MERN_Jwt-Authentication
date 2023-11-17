const express = require('express');
const app = express();
require("./db/conn.js")
const bodyParser = require('body-parser')
const router = require('./routes/router.js');
const PORT  = 3009 ;
const cookieParser = require('cookie-parser')

const cors = require('cors')  

app.use(cors())
app.use(express.json())

// parse application/json
app.use(bodyParser.json())
app.use(cookieParser())
app.use(router);

app.get('/',(req, res) => {
    res.send('Hello World...');
});





app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}.........`);
});