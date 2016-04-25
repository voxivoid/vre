// Review model
"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var schema = new Schema({
    stars: String,
    body: String,
    author: String,
    users: [{type: ObjectId, ref: "User"}]
});

schema.plugin(require("mongoose-timestamp"));

module.exports = mongoose.model("Review", schema);

