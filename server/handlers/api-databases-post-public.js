"use strict";
var joi = require("joi");
var validate = require("express-joi-validator");

var handlers = module.exports = [];

handlers.push(validate({
    body: {
        acronym:        joi.string().required(),
        name:	        joi.string().required(),
        description:	joi.string().required(),
        website:		joi.string(),
        image:			joi.string(),
        author:			joi.string(),
        domainSpecific: joi.boolean().default(false)
    }
}));

handlers.push(function (req, res, next) {

    var Database = req.app.db.models.Database;

    var database = null;

    Promise.resolve()
        .then(function () {
            database = new Database(req.body);

            database.reviews = [];

            return database.save();
        })
        .then(function () {
            res.send({
                success: {
                    message: "Database created.",
                    database: database._id
                }
            });
        })
        .catch(next);

});
