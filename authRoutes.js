// const express = require('express');

// const crypto = require('crypto');

// // var sqlite3 = require('sqlite3');
// const db = require('sqlite');

// // var db = new sqlite3.Database('./database.sqlite3');
// const DB_NAME = './database.sqlite';

// var passport = require('passport'),
//   LocalStrategy = require('passport-local').Strategy;


// app.configure(function () {
//   app.use(express.static('public'));
//   app.use(express.cookieParser());
//   app.use(express.bodyParser());
//   app.use(express.session({
//     secret: 'keyboard cat'
//   }));
//   app.use(passport.initialize());
//   app.use(passport.session());
//   app.use(app.router);
// });

// // ...

// function hashPassword(password, salt) {
//   var hash = crypto.createHash('sha256');
//   hash.update(password);
//   hash.update(salt);
//   return hash.digest('hex');
// }

// passport.use(new LocalStrategy(function (username, password, done) {
//   db.get('SELECT salt FROM users WHERE username = ?', username, function (err, row) {
//     if (!row) return done(null, false);
//     var hash = hashPassword(password, row.salt);
//     db.get('SELECT username, id FROM users WHERE username = ? AND password = ?', username, hash, function (err, row) {
//       if (!row) return done(null, false);
//       return done(null, row);
//     });
//   });
// }));

// passport.use('local-signup', new LocalStrategy({
//         // by default, local strategy uses username and password, we will override with email
//         usernameField : 'email',
//         passwordField : 'password',
//         passReqToCallback : true // allows us to pass back the entire request to the callback
//     },
//     function(req, email, password, done) {

// 		// find a user whose email is the same as the forms email
// 		// we are checking to see if the user trying to login already exists
//         connection.query("SELECT * FROM users WHERE email = '"+email+"'",function(err,rows){
// 			console.log(rows);
// 			console.log("above row object");
// 			if (err)
//                 return done(err);
// 			 if (rows.length) {
//                 return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
//             } else {

// 				// if there is no user with that email
//                 // create the user
//                 var newUserMysql = new Object();
				
// 				newUserMysql.email    = email;
//                 newUserMysql.password = password; // use the generateHash function in our user model
			
// 				var insertQuery = "INSERT INTO users ( email, password ) values ('" + email +"','"+ password +"')";
// 					console.log(insertQuery);
// 				connection.query(insertQuery,function(err,rows){
// 				newUserMysql.id = rows.insertId;
				
// 				return done(null, newUserMysql);
// 				});	
//             }	
// 		});
//     }));

// passport.serializeUser(function (user, done) {
//   return done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   db.get('SELECT id, username FROM users WHERE id = ?', id, function (err, row) {
//     if (!row) return done(null, false);
//     return done(null, row);
//   });
// });

// // ...

// app.post('/auth/login',
//   passport.authenticate('local', {
//     successRedirect: '/home',
//     failureRedirect: '/login',
//     failureFlash: true
//   })
// );