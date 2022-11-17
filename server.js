const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./config');

console.log(config);

var HOST   = config.host;
var PORT   = config.port;
var APP_ENV = config.env;
var APP_VERSION   = config.version;
var APP_TITLE   = config.title;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    //res.send('Hello from App Engine!');
    console.log(config);
    res.send(config);
});
app.get('/submit', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/form.html'));
});
app.post('/submit', (req, res) => {
    console.log({
        name: req.body.name,
        message: req.body.message
    });
    var currdatetime = new Date();
    var metadata = {
        host: HOST,
        port: PORT,
        date: currdatetime,
        app: {
            env: APP_VERSION,
            version: APP_ENV,
            title: APP_TITLE
        },
    }
    console.log(metadata)

    res.send('Hi ' + req.body.name + ', thanks for your message!');
});

app.listen(PORT, HOST, () => {
    console.log(`Server listening on ${HOST}:${PORT}...`);
});
