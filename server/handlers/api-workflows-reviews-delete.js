"use strict";

var handlers = module.exports = [];

handlers.push(function(req, res, next) {

        var Workflow = req.app.db.models.Workflow;

        var id = req.params.workflow;

        var review = req.params.review;

        console.log('\n\nTrying to delete review with id ' + review + ' in workflow ' + id );

        Workflow.findById(id)
            .then(function (workflow) {
                if (!workflow) {
                    res.send({error: id + " workflow doesn't exist"});
                }
                else {
                    Workflow.update(workflow, {$pull: {"reviews": review}}, {safe: true, upsert: true})
                        .then(function () {
                            res.send({success: review + " review removed from workflow " + id});
                        });
                }
            })
    .catch(next);
});

