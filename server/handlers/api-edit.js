"use strict";

var joi = require("joi");
var validate = require("express-joi-validator");

var handlers = module.exports = [];

handlers.push(function (req, res, next) { // input validation
    var collection = req.params.collection;

    if (collection === 'workflows') {
        var Document = req.app.db.models.Workflow;

        handlers.push(validate({
            body: {
                name:           joi.string(),
                description:    joi.string(),
                link:           joi.string(),
                image:          joi.string(),
                author:         joi.string(),
                domainSpecific: joi.boolean()
            }
        }));
    }
    else if (collection === 'databases') {
        var Document = req.app.db.models.Database;

        handlers.push(validate({
            body: {
                acronym:        joi.string(),
                name:	        joi.string(),
                description:	joi.string(),
                website:		joi.string(),
                image:			joi.string(),
                domainSpecific: joi.boolean()
            }
        }));
    }
    else if (collection === 'pubdatas') {
        var Document = req.app.db.models.Pubdata;

        handlers.push(validate({
            body: {
                name:	        joi.string(),
                description:	joi.string(),
                website:		joi.string(),
                image:			joi.string(),
                domainSpecific: joi.boolean()
            }
        }));
    }
    else if (collection === 'news') {
        var Document = req.app.db.models.News;

        handlers.push(validate({
            body: {
                name:	        joi.string(),
                description:	joi.string(),
                website:		joi.string(),
                image:			joi.string(),
                domainSpecific: joi.boolean()
            }
        }));
    }
    else if (collection === 'tools') {
        var Document = req.app.db.models.Tool;

        handlers.push(validate({
            body: {
                acronym:        joi.string(),
                name:	        joi.string(),
                description:	joi.string(),
                website:		joi.string(),
                image:			joi.string(),
                domainSpecific: joi.boolean()
            }
        }));
    }
    else if (collection === 'reviews') {
        var Document = req.app.db.models.Review;

        handlers.push(validate({
            body: {
                stars:  joi.string(),
                body:	joi.string(),
                author:	joi.string()
            }
        }));
    }
    else {
        res.send('Error: no collection specified');
    }
});

handlers.push(function (req, res, next) { // updates the document
    var id = req.params.id;

    Document.findById(id)
        .then(function(doc) {
            if(!doc){
                res.send({error: id + " doc doesn't exist"});
            } else {
                var hasPermissions = false;
                if(req.user) {
                    for(var i = 0; i < doc.users.length; i++){
                        if("" + doc.users[i] === "" + req.user._id){
                            hasPermissions = true;
                        }
                    }
                }
                if(!hasPermissions){
                    res.send({error: id + "You don't have permissions to edit this document."});
                } else {
                    Document.update(doc, {$set: req.body})
                        .then(function(){
                            res.send({success: id + "doc updated."});
                        });
                }
            }
        })
        .catch(next);
});

