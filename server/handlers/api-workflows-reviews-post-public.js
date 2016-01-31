"use strict";

var joi = require("joi");
var validate = require("express-joi-validator");

var handlers = module.exports = [];

handlers.push(validate({
    body: {
        stars:   joi.string(),
        body:    joi.string(),
        author:  joi.string()
    }
}));

handlers.push(function(req, res, next) {

    var Workflow = req.app.db.models.Workflow;

    var id = req.params.id;

    var stars = req.body.stars;
    var comment = req.body.body;
    var author = req.body.author;

    console.log('\n\nTrying to insert review in workflow with id ' + id + "{ stars: " + stars + ", body: " + comment + ", author: " + author + "}");

    Workflow.findById(id)
        .then(function(workflow) {
            if(!workflow){
                res.send({error: id + " workflow doesn't exist"});
            } else {
                Workflow.update(id,{$push: {"reviews": {"stars": stars, "body": comment, "author": author}}})
                    .then(function(){
                        res.send({success: id + "review added."});
                    });
            }

        }
    );

});
