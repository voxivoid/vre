"use strict";
var joi = require("joi");
var validate = require("express-joi-validator");

var handlers = module.exports = [];

handlers.push(validate({
    body: {
        name:						joi.string().required(),
        description:		joi.string().required(),
				link:						joi.string().required(),
				website:				joi.string(),
        image:					joi.string(),
        author:					joi.string(),
        domainSpecific: joi.boolean().default(false)
    }
}));

handlers.push(function (req, res, next) {

    var Workflow = req.app.db.models.Workflow;

    var workflow = null;

    Promise.resolve()
        .then(function () {
            workflow = new Workflow(req.body);

            workflow.reviews = [];

            return workflow.save();
        })
        .then(function () {
            res.send({
                success: {
                    message: "Workflow created.",
                    workflow: workflow._id
                }
            });
        })
        .catch(next);

});
