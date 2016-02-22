"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var schema = new Schema({
    name: String,
    description: String,
    longDescription: String,
    link: String,
    image: String,
    author: String,
    domainSpecific: Boolean,
    reviews: [{type: ObjectId, ref: "Review"}]
});

module.exports = mongoose.model("Workflow", schema);

