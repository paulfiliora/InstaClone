module.exports = function(app, db) {
    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser((user, done) => {
        console.log('serializing user', user)
        done(null, user.id)
    });

    passport.deserializeUser((user, done) => {
        done(null, user)
    });

    //at least checks the db for combo, returns username & id
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, (email, password, done) => {
        // console.log(email, password)
        if (!email || !password) {
            return done('error', {}, {});
        }

        db.get(`SELECT users.first_name, users.email, users.id FROM users WHERE users.email = '${email}' AND users.password = '${password}'`)
            .then((row) => {
                console.log('row is :',row)
                if (!row || row.length === 0) return done(true, false);
                return done(null, row);
            })
    }));
    app.use(passport.initialize());
    app.use(passport.session());  

    app.get('/auth/logout', (request, response, next) => {
        request.logout();
        next();
        // response.redirect('/');
    });

    app.post('/auth/login', (request, response, next) => {
        passport.authenticate('local', (err, user, info) => {
            // console.log('about to authenticate')
            console.log('err, user, info ---- ', err, user, info)
            if (err || !user) {
                console.log('err is :',err);
               next()
            }
            
            request.logIn(user, (err) => {
                // console.log('now in req login', err)
                if (err) return next(err);
                response.header('Content-Type', 'application/json');
                response.send({
                    success: true,
                    id: user.id
                })
                next()

            });
        })(request, response, next);
    });

    app.use((request, response, next) => {
        console.log('req.user :',request.user)
        console.log('req.isAuth :',request.isAuthenticated());

        if (request.isAuthenticated()) {
            console.log('user is authenticated')
            next();
            return ;
        }

        response.header('Content-Type', 'application/json');
        response.status(403);
        response.send({
            success: false,
        })
    })

    return passport;
}