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

    var collection = req.params.collection;

    var Review = req.app.db.models.Review;

    var id = req.params.id;

    var review = null;

    Promise.resolve()
        .then(function () {
            review = new Review(req.body);

            console.log('\n\nTrying to insert review in workflow with id ' + id + ": " + review);

            return review.save();
        })
        .then(function () {

            if (collection === 'workflows') {

                var Document = req.app.db.models.Workflow;

            }
            else {

                var Document = req.app.db.models.Database;

            }

            Document.findById(id)
                .then(function (doc) {
                    if (!doc) {
                        res.send({error: id + " doc doesn't exist"});
                    } else {
                        Document.update(doc, {$push: {"reviews": review}}, {safe: true, upsert: true})
                            .then(function () {
                                res.send({success: review._id + " review added to doc " + id});
                            });
                    }
                });
        })
        .catch(next);
});

