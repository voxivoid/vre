"use strict";

var handlers = module.exports = [];

var passport = require("passport");

handlers.push(function(req, res, next) {
    passport.authenticate("google", function (err, user, info) {
        if (err) return next(err);
        if (!user) return res.status(401).send({error: "Invalid credentials."});

        req.logIn(user, function (err) {
            if (err) return next(err);
            res.send({success: "Logged in successfully."});
        });
    })(req, res, next);
});/**
 * Created by André on 06-Mar-16.
 */
