"use strict";
var joi = require("joi");
var validate = require("express-joi-validator");

var handlers = module.exports = [];

handlers.push(validate({
    body: {
        acronym:        joi.string(),
        name:	        joi.string(),
        description:	joi.string(),
        website:		joi.string(),
        image:			joi.string(),
        domainSpecific: joi.boolean()
    }
}));

handlers.push(function (req, res, next) {

    var Database = req.app.db.models.Database;

    var id = req.params.id;

    console.log(req.body);

    Database.findById(id)
        .then(function(database) {
            if(!database){
                res.send({error: id + " database doesn't exist"});
            } else {
                Database.update(database, {$set: req.body})
                    .then(function(){
                        res.send({success: id + "database updated."});
                    });
            }
        })
        .catch(next);

});
