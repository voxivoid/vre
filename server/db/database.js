"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var schema = new Schema({
    acronym: String,
    name: String,
    description: String,
    website: String,
		image: String,
    author: String,
    domainSpecific: Boolean,
    reviews: [{type: ObjectId, ref: "Review"}]
});

module.exports = mongoose.model("Database", schema);
