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

            return review.save();
        })
        .then(function () {

            if (collection === 'workflows') {

                var Document = req.app.db.models.Workflow;

            }
            else if (collection === 'databases') {

                var Document = req.app.db.models.Database;

            }
            else if (collection === 'pubdatas') {

                var Document = req.app.db.models.Pubdata;

            }
            else if (collection === 'news') {

                var Document = req.app.db.models.News;

            }
            else if (collection === 'tools') {

                var Document = req.app.db.models.Tool;

            }

            //console.log('\nTrying to insert review in ' + collection + ' with id ' + id + ": " + review);

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

