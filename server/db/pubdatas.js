"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var schema = new Schema({
    name: String,
    description: String,
    website: String,
    image: { type: String, default: 'images/database.png' },
    domainSpecific: Boolean,
    reviews: [{type: ObjectId, ref: "Review"}],
    users: [{type: ObjectId, ref: "User"}]
});

module.exports = mongoose.model("Pubdata", schema);

