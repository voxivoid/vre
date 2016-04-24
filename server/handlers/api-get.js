"use strict";

var joi = require("joi");
var validate = require("express-joi-validator");

var handlers = module.exports = [];

handlers.push(validate({
    query: {
        self: joi.boolean().default(false)
    }
}));

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
                doc.hasPermissions = false;

                if(req.user) {
                    for(var i = 0; i < doc.users.length; i++){
                        if("" + doc.users[i] === "" + req.user._id){
                            doc.hasPermissions = true;
                        }
                    }
                }
                delete doc.users;
                return doc;
            });
            if(req.query.self === true){
                var selfDocs = [];
                for(var i = 0; i < sortedDocs.length; i++){
                    if(sortedDocs[i].hasPermissions){
                        selfDocs.push(sortedDocs[i]);
                    }
                }
                console.log("self");
                res.send({success: selfDocs});
            } else {
                console.log("all");
                console.log(req.query.self);
                res.send({success: sortedDocs});
            }
        }).catch(next);
});
