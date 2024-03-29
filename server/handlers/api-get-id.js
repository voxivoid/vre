"use strict";

var handlers = module.exports = [];

handlers.push(function(req, res, next) { // get document by id

    var collection = req.params.collection;

    if (collection === 'workflows') {
        var Document = req.app.db.models.Workflow;
    }
    else if (collection === 'protocols') {
        var Document = req.app.db.models.Protocol;
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
                res.send({error: id + " doc doesn't exist"});
            } else {
                doc = doc.toObject();
                doc.hasPermissions = false;

                if(req.user) {
                    for(var i = 0; i < doc.users.length; i++){
                        if("" + doc.users[i] === "" + req.user._id){
                            doc.hasPermissions = true;
                        }
                    }
                }
                delete doc.users;
                res.send({success: doc});
            }
        })
        .catch(next);
});