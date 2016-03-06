"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var schema = new Schema({
    id: String,
    token: String,
    email: String,
    name: String
});

module.exports = mongoose.model("User", schema);

