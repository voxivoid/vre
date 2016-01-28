"use strict";

var handlers = module.exports = [];

handlers.push(function(req, res, next) {

    var Workflow = req.app.db.models.Workflow;

    var id = req.params.id;

    console.log('\n\nTrying to insert review in workflow with id ' + id );

    Workflow.findByIdAndUpdate(id,{$push: {"reviews": {stars: stars, body: body, author: author}}},{safe: true, upsert: true, new : true},
        function(err, Workflow) {
            console.log(err);
        }
    );

});
