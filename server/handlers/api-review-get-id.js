"use strict";

var handlers = module.exports = [];

handlers.push(function(req, res, next) {

    var Review = req.app.db.models.Review;

    var id = req.params.id;

    Review.findById(id)
        .then(function(review) {
            if(!review){
                res.send({error: id + " review doesn't exist"});
            } else {
                res.send({success: review.toObject()});
            }
        })
        .catch(next);
});