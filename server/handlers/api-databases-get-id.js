"use strict";

var handlers = module.exports = [];

handlers.push(function(req, res, next) {

    var Database = req.app.db.models.Database;

    var id = req.params.id;

    console.log('\n\nTrying to get database with id ' + id );

    Database.findById(id)
        .then(function(database) {
            if(!database){
                res.send({error: id + " database doesn't exist"});
            } else {
                res.send({success: database.toObject()});
            }
        })
        .catch(next);
});