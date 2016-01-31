"use strict";

var joi = require("joi");
var validate = require("express-joi-validator");

var handlers = module.exports = [];

handlers.push(validate({
    body: {
        stars:   joi.string(),
        body:    joi.string(),
        author:  joi.string()
    }
}));

handlers.push(function(req, res, next) {

    var Review = req.app.db.models.Review;

    var review = null;

    Promise.resolve()
        .then(function () {
            review = new Review(req.body);

            var id = req.params.id;

            console.log('\n\nTrying to insert review in workflow with id ' + id + ": " + review );

            handlers.push(validate({
                body: {
                    name:           joi.string(),
                    description:    joi.string(),
                    link:           joi.string(),
                    image:          joi.string(),
                    author:         joi.string(),
                    domainSpecific: joi.boolean()
                }
            }));

            handlers.push(function (req, res, next) {

                var Workflow = req.app.db.models.Workflow;

                Workflow.findById(id)
                    .then(function (workflow) {
                            if (!workflow) {
                                res.send({error: id + " workflow doesn't exist"});
                            } else {
                                Workflow.update(id, {$push: {"reviews": review}}, {safe: true, upsert: true})
                                    .then(function () {
                                        res.send({success: id + "review added."});
                                    });
                            }

                        }
                    );
            });

            //return review.save();
        })
        .then(function () {
            res.send({
                success: {
                    message: "Review created.",
                    workflow: review._id
                }
            });
        })
        .catch(next);

});
