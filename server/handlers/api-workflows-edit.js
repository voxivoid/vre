"use strict";

var joi = require("joi");
var validate = require("express-joi-validator");

var handlers = module.exports = [];

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

handlers.push(function (req, res, next) {

    var Workflow = req.app.db.models.Workflow;

    var id = req.params.id;

    console.log(req.body);

    Workflow.findById(id)
        .then(function(workflow) {
            if(!workflow){
                res.send({error: id + " workflow doesn't exist"});
            } else {
                Workflow.update(workflow, {$set: req.body})
                    .then(function(){
                        res.send({success: id + "workflow updated."});
                    });
            }
        })
        .catch(next);

});
