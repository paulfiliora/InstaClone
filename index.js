//include express
const express = require('express');

//include sqlite
const db = require('sqlite');

// api routes
const instacloneApi = require('./apiroutes');

<<<<<<< HEAD
// const authentication = require('./authRoutes');

=======
>>>>>>> 204ab2fcda8abf3433153c872ef368c37adbfdf6
//create an express application
let app = express();
const port = 4001;

const DB_NAME = './database.sqlite';

app.use(require('./apiroutes'))
<<<<<<< HEAD

const socket = require('./sqliteui/websocket');

app.use('/', express.static( 'public', {
	'index': [ 'index.html' ]
}));
// app.use('/', express.static('./sqliteui/public', {
//     'index': ['index.html']
// }));

//prepend api routes url
app.use('/api', instacloneApi);
// app.use('/auth', authentication);

const SocketInst = socket(DB_NAME, app);
app = SocketInst.app;



//*******************************//
//************************************************8*****// here while I test3

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
    console.log('serializing user', user)
    done(null, user.id)
});

passport.deserializeUser((user, done) => {
    // db.all('SELECT id, username FROM users WHERE id = ?', id, function (err, row) {
    // if (!row) return done(null, false);
    // done(null, user)
    // });
    User.findById(user.id, function (err, user) {
        done(err, user);
    });
});

//at least checks the db for combo, returns username & id
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => {
    if (!email || !password) {
        return done('error', {}, {});
    }

    // db.all(`SELECT users.email, users.id FROM users WHERE users.email = '${email}' AND users.password = '${password}'`,function(err,rows){
    //     if (err)
    //         return done(err);
    //         if (!rows.length) {
    //         return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
    //         } 

    //         if (!( rows[0].password == password))
    //         return done(null, false, req.flash('loginMessage', 'Wrong password.')); // create the loginMessage and save it to session as flashdata

    //         // all is well, return successful user
    //         return done(null, rows[0]);             
    //     });

    db.all(`SELECT users.first_name, users.email, users.id FROM users WHERE users.email = '${email}' AND users.password = '${password}'`)
        .then((row) => {
            console.log(row)
            if (!row || row.length === 0) return done(true, false);
            return done(null, row);
        })
}));

app.use(passport.initialize());
app.use(passport.session());

app.post('/auth/login', (request, response, next) => {
    passport.authenticate('local', (err, user, info) => {
        console.log('about to authenticate')
        console.log(err, user, info)
        if (err || !user) {
            console.log(err);
           next()
        }
        
        request.logIn(user, (err) => {
            console.log('now in req login', err)
            if (err) return next(err);
            response.header('Content-Type', 'application/json');
            response.send({
                success: true,
            });
        });
    })(request, response, next);
});

app.use((req, res) => {
    res.header('Content-Type', 'application/json')
    res.send({success: false})
})

//*******************************//
//*******************************//
=======

const socket = require('./sqliteui/websocket');

app.use('/', express.static( 'public', {
	'index': [ 'index.html' ]
}));


//prepend api routes url
app.use('/api', instacloneApi);

const SocketInst = socket(DB_NAME, app);
app = SocketInst.app;
>>>>>>> 204ab2fcda8abf3433153c872ef368c37adbfdf6

Promise.resolve()
    .then(() => db.open(DB_NAME, {
        Promise
    }))
    .then(() => db.migrate({
        force: 'last'
    }))
    .then(() => app.listen(port))
<<<<<<< HEAD
    .then(() => {
        console.log(`Server started on port ${port}`)
    })
=======
    .then(() => {console.log(`Server started on port ${port}`)})
>>>>>>> 204ab2fcda8abf3433153c872ef368c37adbfdf6
    .catch(err => console.error(err.stack))