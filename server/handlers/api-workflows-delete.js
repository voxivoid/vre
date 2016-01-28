"use strict";

var handlers = module.exports = [];

handlers.push(function(req, res, next) {

    var Workflow = req.app.db.models.Workflow;

    var id = req.params.id;

    console.log('\n\nTrying to delete workflow with id ' + id );

    Workflow.remove(id)
        .then(function(workflow) {
            res.send({success: "workflow removed"});
        })
        .catch(next);
});