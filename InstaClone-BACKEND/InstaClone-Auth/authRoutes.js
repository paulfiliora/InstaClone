const express = require('express');

const authApp = express();

const instaApp = require('./instaApp')

const parser = require('body-parser');

const expressSession = require('express-session');

authApp.use(parser.json());

authApp.use(expressSession({
    secret: 'NYCDA',
    resave: false,
    saveUninitialized: false
}));

authApp.post('/auth/register', (request, response, next) => {
    const isCreated = instaApp.createUser(request.body)
        .then((data) => {
            response.header('Content-Type', 'application/json');
            response.send({
                success: true
            })
        })
        .catch((e) => {
            console.log(e)
            response.status(401);
        });
});

module.exports = authApp;