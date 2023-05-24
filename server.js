const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./config');

const { MongoClient } = require('mongodb');

console.log(config);

var HOST   = config.host;
var PORT   = config.port;
var APP_ENV = config.env;
var APP_VERSION   = config.version;
var APP_TITLE   = config.title;

// database
var mydb = null // global variable to hold the connection

var DB_TYPE   = config.dbtype;
var DB_URL   = config.dburl;
var DB_NAME   = config.dbname;

console.log(`${DB_TYPE}: ${DB_URL}`);

if (DB_TYPE == "mongodb") {
    MongoClient.connect(DB_URL, {
        connectTimeoutMS: 5000
    }).then((conn) => {
        console.log('Connected to MongoDB');
        mydb = conn.db(DB_NAME);
       // start web server
    })
}

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
    var msg = {
        name: req.body.name,
        message: req.body.message
    };
    console.log(msg);
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
    if (mydb == null) {

    var renderText = `
<!DOCTYPE html>
      <html>
  <head>
    <title>${APP_TITLE}</title>
    <style>
      .header {
        height: 40px;
        padding: 20px 20px 0;
        background: #e1e1e1;
      }
      .main-content {
        height: 60vh;
        padding: 20px;
      }
      footer {
        padding: 10px 20px;
        background: #666;
        color: white;
      }
      a {
        color: #00aaff;
      }
    </style>
  </head>
      <body>
      <div class="main-content">
        <h2>
          Hi ${req.body.name},
        </h2>
        <p>
          Thanks for your message!
        </p>
        <p>
		  Message: ${req.body.message}
        </p>
        <p>
		  Time: ${currdatetime}
        </p>
        <p>
		  Processed by: ${HOST}
        </p>
      </div>
      <footer>
        <p>${APP_TITLE} © ${HOST}. All rights reserved.</p>
      </footer>
      </body>
      </html>
    `;

    res.send(renderText);
    return
    }

    mydb.collection('messages').insertOne(msg)
    .then((smsg) => {
        console.log('saved message', smsg);
        mydb.collection('messages').find({}).toArray()
        .then((results) => {
            console.log('got results', results.length);
            var renderText = `
            <!DOCTYPE html>
            <html>
            <head>
            <title>${APP_TITLE}</title>
            <style>
              .header {
                height: 40px;
                padding: 20px 20px 0;
                background: #e1e1e1;
              }
              .main-content {
                height: 60vh;
                padding: 20px;
              }
              footer {
                padding: 10px 20px;
                background: #666;
                color: white;
              }
              a {
                color: #00aaff;
              }
            </style>
            </head>
              <body>
              <div class="main-content">
                <h2>
                  Hi ${req.body.name},
                </h2>
                <p>
                  Thanks for your message!
                </p>
                <p>
                  Message: ${req.body.message}
                </p>
                <p>
                  Time: ${currdatetime}
                </p>
                <p>
                  Processed by: ${HOST}
                </p>
                <p>
                  Using database: ${DB_TYPE}
                </p>
                <p>
                  Number of messages: ${results.length}
                </p>
              </div>
              <footer>
                <p>${APP_TITLE} © ${HOST}. All rights reserved.</p>
              </footer>
              </body>
              </html>
            `;
            res.send(renderText);
        });
    });
});

app.listen(PORT, HOST, () => {
    console.log(`Server listening on ${HOST}:${PORT}...`);
});
