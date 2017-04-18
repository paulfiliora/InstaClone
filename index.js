//include express
const express = require('express');

//include sqlite
const db = require('sqlite');

// api routes
const instacloneApi = require('./apiroutes');

//create an express application
let app = express();
const port = 4001;

const DB_NAME = './database.sqlite';

app.use(require('./apiroutes'))

const socket = require('./sqliteui/websocket');
app.use('/', express.static('./sqliteui/public', {
    'index': ['index.html']
}));

//prepend api routes url
app.use('/api', instacloneApi);

const SocketInst = socket(DB_NAME, app);
app = SocketInst.app;

Promise.resolve()
    .then(() => db.open(DB_NAME, { Promise }))
    // .then(() => db.migrate({ force: 'last' }))
    .then(() => app.listen(port))
    .then(() => {
        console.log(`Server started on port ${port}`)
     })
    .catch(err => console.error(err.stack))