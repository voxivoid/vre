"use strict";

var handlers = module.exports = [];

handlers.push(function(req, res, next) {

    var Review = req.app.db.models.Review;

    Promise.all(Review.find())
        .then(function(reviews){
            reviews = reviews.map(function (review) {
                review = review.toObject();
                return review;
            });

            res.send({success: reviews});
        }).catch(next);
});