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

    Promise.all(Document.find())
        .then(function(docs){
            var sortedDocs = docs.sort(function(a,b) {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            });
            sortedDocs = sortedDocs.map(function (doc) {
                doc = doc.toObject();
                return doc;
            });
            res.send({success: sortedDocs});
        }).catch(next);
});
