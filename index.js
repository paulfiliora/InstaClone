// testing commit
const express = require('express');
const sqlite = require('sqlite');
let app = express();
const db = require('sqlite');
const expressSession = require('express-session');
const parser = require('body-parser');
const DB_NAME = './database.sqlite';
const apiRoutes = require('./apiRoutes');

app.use('/api', apiRoutes(db))
app.use(parser.json())
app.use(expressSession({
    secret: 'nycda',
    resave: false,
    saveUninitialized: false
}));
app.use('/', express.static('public'));

//WebUi for testing sql
const socket = require('./sqliteui/websocket');
// app.use('/', express.static('./sqliteui/public', {
//     'index': ['index.html']
// }));
const SocketInst = socket(DB_NAME, app);
app = SocketInst.app;



const passport = require('./passport')(app, db);

Promise.resolve()
    .then(() => db.open(DB_NAME, {
        Promise
    }))
    .then(() => db.migrate({
        force: 'last'
    }))
    .then(() => app.listen(4001))
    .then(() => {
        console.log(`Server started on port 4001`)
    })
    .catch(err => console.error(err.stack))