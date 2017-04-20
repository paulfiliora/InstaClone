
//*******************************//
//************************************************8*****// here while I test3

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
    done(null, user)
});

passport.deserializeUser((user, done) => {
    // db.all('SELECT id, username FROM users WHERE id = ?', id, function (err, row) {
    // if (!row) return done(null, false);
    // done(null, user)
    // });
    User.findById(id, function (err, user) {
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

    db.all(`SELECT users.email, users.id FROM users WHERE users.email = '${email}' AND users.password = '${password}'`)
        .then((row) => {
            console.log(row)
            if (!row) return done(null, false);
            return done(null, row);
        })
}));

app.use(passport.initialize());
app.use(passport.session());

app.post('/auth/login', (request, response, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) console.log(err);
        if (!user) console.log(user);

        request.logIn(user, (err) => {
            console.log('now in req login')
            if (err) return next(err);
            response.header('Content-Type', 'application/json');
            response.send({
                success: true,
            });
        });
    })(request, response, next);
});

//*******************************//
//*******************************//