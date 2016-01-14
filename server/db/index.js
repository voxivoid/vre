"use strict";

var mongoose = require("mongoose");

var db = module.exports = {};

db.connection = mongoose.connect("mongodb://" + global.config.db.host + ":" + global.config.db.port + "/" + global.config.db.database);

db.models = {
    Workflow: require("./workflow")
};