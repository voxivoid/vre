"use strict";

var handlers = module.exports = [];

handlers.push(function(req, res, next) {

    var Review = req.app.db.models.Review;

    var id = req.params.id;

    console.log('\n\nTrying to delete review with id ' + id );

    Review.findByIdAndRemove(id)
        .then(function(review) {
            if(!review){
                res.send({error: id + " review doesn't exist"});
            } else {
                res.send({success: "review removed"});
            }
        })
        .catch(next);
});