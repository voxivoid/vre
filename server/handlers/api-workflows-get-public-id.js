"use strict";

var handlers = module.exports = [];

handlers.push(function(req, res, next) {

    var Workflow = req.app.db.models.Workflow;

    var id = new req.params.id;

    var query = Workflow.where({ _id: id });

    console.log('Trying to get ' + id );

    Promise.all(query.find({ "_id": "ObjectId(" + id + ")"}))
        .then(function(workflows){
            workflows = workflows.map(function (workflow) {
                workflow = workflow.toObject();
                return workflow;
            });

            res.send({workflows});
        }).catch(next);
});