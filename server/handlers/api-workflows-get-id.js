"use strict";

var handlers = module.exports = [];

handlers.push(function(req, res, next) {

    var Workflow = req.app.db.models.Workflow;

    var id = req.params.id;

    console.log('\n\nTrying to get workflow with id ' + id );

    Workflow.findById(id)
        .then(function(workflow) {
            if(!workflow){
                res.send({error: id + " workflow doesn't exist"});
            } else {
                res.send({success: workflow.toObject()});
            }
        })
        .catch(next);
});