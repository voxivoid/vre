"use strict";

var handlers = module.exports = [];

handlers.push(function(req, res, next) {

    var Database = req.app.db.models.Database;

    Promise.all(Database.find())
        .then(function(databases){
            databases = databases.map(function (database) {
                database = database.toObject();
                return database;
            });

            res.send({success: databases});
        }).catch(next);
});