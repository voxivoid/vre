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
    else if (collection === 'reviews') {

        var Document = req.app.db.models.Review;

    }
    else {

        res.send('Error: no collection specified');
    }

    Promise.all(Document.find())
        .then(function(docs){
            docs = docs.map(function (doc) {
                doc = doc.toObject();
                return doc;
            });

            res.send({success: docs});
        }).catch(next);
});
