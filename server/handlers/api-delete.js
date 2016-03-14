"use strict";

var handlers = module.exports = [];

handlers.push(function(req, res, next) {

    var collection = req.params.collection;

    if (collection === 'workflows') {

        var Document = req.app.db.models.Workflow;

    }
    else if (collection === 'databases') {

        var Document = req.app.db.models.Database;

    }
    else if (collection === 'pubdatas') {

        var Document = req.app.db.models.Pubdata;

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

    //console.log('\n\nTrying to delete document with id ' + id );

    Document.findByIdAndRemove(id)
        .then(function(doc) {
            if(!doc){
                res.send({error: id + " document doesn't exist"});
            } else {
                res.send({success: "document removed"});
            }
        })
        .catch(next);
});