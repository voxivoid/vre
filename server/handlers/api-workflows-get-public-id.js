"use strict";

var handlers = module.exports = [];

handlers.push(function(req, res, next) {
    var Workflow = req.app.db.models.Workflow;

    var id = req.params.id;

    console.log('Trying to get ' + id );

    Promise.all(Workflow.find({ "_id": ObjectId(req.params.id)}))
        .then(function(workflows){
            workflows = workflows.map(function (workflow) {
                workflow = workflow.toObject();
                return workflow;
            });

            res.send({workflows});
        }).catch(next);
});