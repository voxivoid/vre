"use strict";

var passport = require("passport");

var handlers = module.exports = [];

handlers.push(function(req, res, next) {
    passport.authenticate('google', { scope : ['profile', 'email'] });
});