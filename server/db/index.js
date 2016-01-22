"use strict";

var mongoose = require("mongoose");

mongoose.Promise = Promise;

var db = module.exports = {};

db.connection = mongoose.connect("mongodb://" + global.config.db.user + ":" + global.config.db.password + "@" + global.config.db.host + ":" + global.config.db.port + "/" + global.config.db.database );

var test = mongoose.connection;
test.once('open', function () {
	console.log('MongoDB connection successful as user ' + global.config.db.user);
});

db.models = {
    Workflow: require("./workflow")
};
