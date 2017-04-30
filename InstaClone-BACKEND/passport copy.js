module.exports = function (app, db) {
    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;



    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, (email, password, done) => {
        console.log(email, password)
        if (!email || !password) {
            return done('error', {}, {});
        }
        db.get(`SELECT users.first_name, users.email, users.id FROM users WHERE users.email = '${email}' AND users.password = '${password}'`)
            .then((row) => {
                console.log(row)
                if (!row || row.length === 0) return done(true, false);
                return done(null, row);
            })
    }));

    passport.serializeUser((user, done) => {
        console.log('serializing user', user)
        done(null, user.id)
    });

    passport.deserializeUser((user, done) => {
        console.log('deserializing user', user)
        done(null, user)
    });

    app.use(passport.initialize());
    app.use(passport.session());

    app.post('/auth/login', (req, res, next) => {

        passport.authenticate('local', function (err, user, info) {
            passport.authenticate('local', (err, user, info) => {
                // console.log('about to authenticate')
                // console.log('err, user, info ---- ', err, user, info)
                if (err || !user) {
                    console.log('err is :', err);
                    next()
                }

                req.logIn(user, (err) => {
                    console.log('now in req login', err)
                    if (err) return next(err);
                    // res.header('Content-Type', 'application/json');
                    // res.send({
                    //     success: true,
                    //     id: user.id
                    // });
                    next()
                });
            })(req, res, next);
        });
    })

    app.use((req, res, next) => {
        console.log('in middleware')
        console.log('req.user :', req.user)
        console.log('req.session :', req.session)
        console.log('req.isAuth :', req.isAuthenticated());
        const user = req.user

        if (req.isAuthenticated()) {
            console.log('authenticated')
            res.redirect('/home');
            // next();
            return;
        }
        res.redirect('/')
        // res.header('Content-Type', 'application/json');
        // res.status(403);
        // res.send({
        //     success: false,
        // })
    })

    return passport;
}