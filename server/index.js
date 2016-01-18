"use strict";

Promise = require("bluebird");

Promise.config({
    warnings: false,
    longStackTraces: false
});

var express = require("express");
var mongoose = require("mongoose");

global.config = require("./config");
var app = express();

app.use(require("helmet")());
app.use(require("compression")());
app.use(require("body-parser").json());
app.use(require("body-parser").urlencoded({extended: true}));

app.db = require("./db");
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