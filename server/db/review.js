"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
    starts: String,
    body: String,
    author: String
});

schema.plugin(require("mongoose-timestamp"));

module.exports = mongoose.model("Review", schema);

