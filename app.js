// load app server using express
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

// router
const router = require('./routes/user.js');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('./public'));
app.use(morgan('short'));

app.get("/", (req, res) => {
    console.log("Responding to /");
    res.send("Hello from /");
});

app.use(router);

// localhost:3003
app.listen(3003, () => {
    console.log("Server is listening on 3003...");
});