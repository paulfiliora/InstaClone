const express = require('express');

const authApp = express();

const Users = require('./users')

let app = express();
const port = 4001;

// data base using sqlite link
const db = require('sqlite');
const DB_NAME = './database.sqlite';

// parser session middleware
const parser = require('body-parser');


// grab authentication routes
const Auth = require('./authRoutes');

//authorize user
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


// grab the api routes
const instacloneApi = require('./apiroutes');

// serve the public folder
app.use('/', express.static( 'public', {
	'index': [ 'index.html' ]
}));

app.use(Auth);

//middleware
app.use('/apiroutes', instacloneApi);
//have the application listen on a specific port
app.listen(4001, () => {
    console.log('Example app listening on port 4001!');
});

// use body parser
authApp.use(parser.json());

authApp.use(expressSession({
	secret: 'LOLSECRETZ'
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},(email, password, done) => {
    // ... app specific implementation
    // ... if err
    return done(err, user, info);

    // ... if success
    return done(null, user);
  }
));
app.use(passport.initialize());
app.use(passport.session());

// authApp.post('/auth/signup', (request, response) => {
// 	const {body} = request;

// 	// we want: email address
// 	// name
// 	// password

// 	const {email, name, password} = body;
// 	console.log(email, name, password);
// 	const isCreated = Users.createNewUser(email, name, password);

// 	response.header('Content-Type', 'application/json');
// 	if (isCreated) {
// 		response.send({success: true})
// 	}
// 	else {
// 		response.header('Content-Type', 'application/json');
// 		response.status(400)
// 		response.send({error: 'some fields not valid LOL'})
// 	}
// });

// login route
authApp.post('auth/login', (request, response) => {
	console.log(request.session);
	if (typeof request.session.instacloneApi === "undefined") {
		request.session.instacloneApi = 0;
	}
	else {
		request.session.instacloneApi++;
	}
	response.send('IN LOGIN ROUTE ' + request.session.instacloneApi)
});

module.exports = AuthRoutes;