"use strict";

var joi = require("joi");
var validate = require("express-joi-validator");

var handlers = module.exports = [];

handlers.push(validate({
    body: {
        stars:   joi.string(),
        body:    joi.string(),
        author:  joi.string(),
    }
}));

handlers.push(function(req, res, next) {

    var Workflow = req.app.db.models.Workflow;

    var id = req.params.id;

    console.log('\n\nTrying to insert review in workflow with id ' + id );

    Workflow.findById(id)
        .then(function(workflow) {
            if(!workflow){
                res.send({error: id + " workflow doesn't exist"});
            } else {
                Workflow.update(
                    id,
                    {$push: {"reviews": {"stars": req.body.stars, "body": req.body.body, "author": req.body.author}}},
                    {safe: true, upsert: true, new : true})
                    .then(function(){
                        res.send({success: id + "review added."});
                    });
            }

        }
    );

});
