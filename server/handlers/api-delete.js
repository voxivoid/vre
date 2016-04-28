"use strict";

var handlers = module.exports = [];

handlers.push(function(req, res, next) { // delete document from collection
    var collection = req.params.collection;
    var RevModel = req.app.db.models.Review;

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
    else if (collection === 'reviews') {
        var Document = req.app.db.models.Review;
    }
    else {
        res.send('Error: no collection specified');
    }

    var id = req.params.id;

    Document.findById(id)
        .then(function(doc) {
            if(!doc){
                res.send({error: id + " document doesn't exist"});
            } else {
                if(req.user) {
                    var hasPermissions = false;
                    for(var i = 0; i < doc.users.length; i++){
                        if("" + doc.users[i] === "" + req.user._id){
                            hasPermissions = true;
                        }
                    }
                }
                if(!hasPermissions){
                    res.send({error: id + " You don't have permissions to delete this document."})
                } else {
                    if (collection != 'reviews') {
                        for (var j = 0; j < doc.reviews.length; j++) {
                            var revid = doc.reviews[j];
                            RevModel.findById(revid)
                                .then(function (review) {
                                    RevModel.remove(review)
                                        .then(function () {
                                        });
                                });
                        }
                    }
                    Document.remove(doc)
                        .then(function(){
                            res.send({success: id + " doc removed."});
                        });
                }
            }
        })
        .catch(next);
});