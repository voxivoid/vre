"use strict";

module.exports = function (app) {
    var passport = require("passport");
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var configAuth = require('./auth');
    var User = app.db.models.User;

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new GoogleStrategy({
            clientID        : configAuth.googleAuth.clientID,
            clientSecret    : configAuth.googleAuth.clientSecret,
            callbackURL     : configAuth.googleAuth.callbackURL
        },
        function(token, refreshToken, profile, done) {
            process.nextTick(function() {
                User.findOne({ 'id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        return done(null, user);
                    } else {
                        var newUser = new User();

                        newUser.id = profile.id;
                        newUser.token = token;
                        newUser.name = profile.displayName;
                        newUser.email = profile.emails[0].value; // pull the first email

                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });

        }));
};