"use strict";

Promise = require("bluebird");

Promise.config({
    warnings: false,
    longStackTraces: false,
    multiArgs: true
});

var express = require("express");
var mongoose = require("mongoose");



global.config = require("./config");
var app = express();

/*app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow (other options: OPTIONS, PATCH, DELETE)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});*/

app.use(require("helmet")());
app.use(require("compression")());
app.use(require("body-parser").json());
app.use(require("body-parser").urlencoded({extended: true}));

var session = require("express-session");

app.use(session({ secret: 'vre' }));

app.db = require("./db");
app.passport = require("./passport")(app);
app.use(app.passport.initialize());
app.use(app.passport.session());

require("./routes")(app);



app.use(function (err, req, res, next) {
    if (config.environment !== "development") { // production error handler
        if (!res.headersSent) res.sendStatus(500);
        console.error(err.stack);
    }
    else { // development error handler (default)
        next(err);
    }
});

var server = app.listen(config.port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Server listening at http://%s:%s", host, port);
});
