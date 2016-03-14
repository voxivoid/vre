"use strict";

var handlers = module.exports = [];

handlers.push(function(req, res, next) {

    var collection = req.params.collection;

    var id = req.params.docid;

    var review = req.params.revid;

    if (collection === 'workflows') {

        var Document = req.app.db.models.Workflow;

    }
    else if (collection === 'databases'){

        var Document = req.app.db.models.Database;

    }
    else if (collection === 'pubdatas'){

        var Document = req.app.db.models.Pubdata;

    }
    else if (collection === 'tools'){

        var Document = req.app.db.models.Tool;

}

        //console.log('\n\nTrying to delete review with id ' + review + ' in document ' + id );

        Document.findById(id)
            .then(function (doc) {
                if (!doc) {
                    res.send({error: id + " document doesn't exist"});
                }
                else {
                    Document.update(doc, {$pull: {"reviews": review}}, {safe: true, upsert: true})
                        .then(function () {
                            res.send({success: review + " review removed from document " + id});
                        });
                }
            })
            .catch(next);

});

