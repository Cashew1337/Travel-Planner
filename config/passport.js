const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const User = connection.models.User;

// check route!!
const validPassword = require('../lib/passwordUtils').validPassword;

const customFields = {
    usernameField: 'uname',
    passwordField: 'pw'
};


const verifyCallback = (username, password, done) => {
    
    User.findOne({ username: username })
        .then((user) => {
            
            if (!user) { return done(null, false) }

            const isValid = validPassword(password, user.hash, user.salt);

            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false);
            }
            
        })
        .catch((err) => {
            done(err);
        });
}

var crypto = require('crypto');

// We are defining strategy which is the new local strategy
const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);


// Put user into the session and how to grab a user out of the session, then we are putting user ID into the session and finding it in the database

passport.serializeUser((user, done) => {
    done(null, user.id);
});


passport.deserializeUser((userId, done) => {
    User.findbyId(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});

