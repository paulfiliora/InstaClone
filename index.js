const express = require('express');
const sqlite = require('sqlite');
const app = express();

const apiRoutes = require('./apiRoutes');
app.use('/api', apiRoutes(db))

const db = require('sqlite');
const DB_NAME = './database.sqlite';

const parser = require('body-parser');
app.use(parser.json())

const expressSession = require('express-session');
app.use(expressSession({
    secret: 'VENUS'
}));

app.use('/', express.static('public'));

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