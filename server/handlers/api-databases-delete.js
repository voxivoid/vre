"use strict";

var handlers = module.exports = [];

handlers.push(function(req, res, next) {

    var Database = req.app.db.models.Database;

    var id = req.params.id;

    console.log('\n\nTrying to delete database with id ' + id );

    Database.findByIdAndRemove(id)
        .then(function(database) {
            if(!database){
                res.send({error: id + " database doesn't exist"});
            } else {
                res.send({success: "database removed"});
            }
        })
        .catch(next);
});