"use strict";
var joi = require("joi");
var validate = require("express-joi-validator");

var handlers = module.exports = [];

handlers.push(function (req, res, next) {

    var collection = req.params.collection;

    if (collection === 'workflows') {

        var Document = req.app.db.models.Workflow;

        handlers.push(validate({
            body: {
                name: joi.string().required(),
                description: joi.string().required(),
                link: joi.string(),
                image: joi.string(),
                author:	joi.string(),
                domainSpecific: joi.boolean().default(false)
            }
        }));

    }
    else if (collection === 'databases') {

        var Document = req.app.db.models.Database;

        handlers.push(validate({
            body: {
                acronym:        joi.string(),
                name:	        joi.string(),
                description:	joi.string(),
                website:		joi.string(),
                image:			joi.string(),
                domainSpecific: joi.boolean()
            }
        }));

    }
    else if (collection === 'reviews') {

        var Document = req.app.db.models.Review;

        handlers.push(validate({
            body: {
                stars:  joi.string(),
                body:	joi.string(),
                author:	joi.string()
            }
        }));

    }
    else {

        res.send('Error: no collection specified');
    }


    var doc = null;

    Promise.resolve()
        .then(function () {
            doc = new Document(req.body);

            doc.reviews = [];

            return doc.save();
        })
        .then(function () {
            res.send({
                success: {
                    message: "Document created.",
                    doc: doc._id
                }
            });
        })
        .catch(next);

});
