"use strict";

var handlers = module.exports = [];

handlers.push(function(req, res, next) {
    var Workflow = req.app.db.models.Workflow;

    Promise.all(Workflow.find())
        .then(function(workflows){
            workflows = workflows.map(function (workflow) {
                workflow = workflow.toObject();
                return workflow;
            });

            res.send({workflows});
        }).catch(next);
});

