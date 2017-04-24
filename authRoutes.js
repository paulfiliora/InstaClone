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
    let args = {};
    for (const prop in request.body) {
        args['$' + prop] = request.body[prop];
    }
    request.body = args;

    // const {
    //     body
    // } = request;
    // const {
    //     first_name,
    //     last_name,
    //     email,
    //     password
    // } = body;
    // const isCreated = instaApp.createUser(first_name, last_name, email, password);
    instaApp.createUser(request.body)
        // .then((data) => {
        //     res.header('Content-Type', 'application/json');
        //     res.send({
        //         post: data
        //     });
        // })
        .catch((e) => {
            console.log(e)
            response.status(401);
        });


    // response.header('Content-Type', 'application/json');
    // if (isCreated) {
    //     response.send({
    //         success: true
    //     })
    // } else {
    //     response.header('Content-Type', 'application/json');
    //     response.status(400)
    //     response.send({
    //         error: 'some fields not valid'
    //     })
    // }
});

module.exports = authApp;