"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
    rating: String,
    review: String,
    email: String
});

schema.plugin(require("mongoose-timestamp"));

module.exports = mongoose.model("Review", schema);

