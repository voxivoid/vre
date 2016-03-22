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
                longDescription: joi.string().required(),
                link: joi.string(),
                image: joi.string().default("images/workflow.png"),
                author:	joi.string().required,
                domainSpecific: joi.boolean().default(false)
            }
        }));

    }
    else if (collection === 'databases') {

        var Document = req.app.db.models.Database;

        handlers.push(validate({
            body: {
                acronym:        joi.string(),
                name:	        joi.string().required,
                description:	joi.string().required,
                website:		joi.string().required,
                image:			joi.string().default("images/database.png"),
                domainSpecific: joi.boolean().default(false)
            }
        }));

    }
    else if (collection === 'pubdatas') {

        var Document = req.app.db.models.Pubdata;

        handlers.push(validate({
            body: {
                name:	        joi.string().required,
                description:	joi.string().required,
                website:		joi.string().required,
                image:			joi.string().default("images/database.png"),
                domainSpecific: joi.boolean().default(false)
            }
        }));

    }
    else if (collection === 'news') {

        var Document = req.app.db.models.News;

        handlers.push(validate({
            body: {
                name:	        joi.string().required,
                description:	joi.string().required,
                website:		joi.string().required,
                image:			joi.string().default("images/news.ico"),
                domainSpecific: joi.boolean().default(false)
            }
        }));

    }
    else if (collection === 'tools') {

        var Document = req.app.db.models.Tool;

        handlers.push(validate({
            body: {
                acronym:        joi.string(),
                name:	        joi.string().required,
                description:	joi.string().required,
                website:		joi.string().required,
                image:			joi.string().default("images/tool.ico"),
                domainSpecific: joi.boolean().default(false)
            }
        }));

    }
    else if (collection === 'reviews') {

        var Document = req.app.db.models.Review;

        handlers.push(validate({
            body: {
                stars:  joi.string().required,
                body:	joi.string().required,
                author:	joi.string().required
            }
        }));

    }
    else {

        res.send('Error: no collection specified');
    }


    var doc = null;

    Promise.resolve()
        .then(function () {
            req.body.users = [req.user];
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
