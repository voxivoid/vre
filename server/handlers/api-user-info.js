"use strict";

var joi = require("joi");
var validate = require("express-joi-validator");

var handlers = module.exports = [];

handlers.push(validate({
    query: {
        self: joi.boolean().default(false)
    }
}));

handlers.push(function(req, res, next) { // get document from collection

    var Document = req.app.db.models.User;


    Promise.all(Document.find())
        .then(function(docs){
            docs = docs.map(function(doc) {
                doc = doc.toObject();
                doc.hasPermissions = false;

                if (req.user) {
                    if ("" + doc._id === "" + req.user._id) {
                        res.send({success: {"_id": doc._id, "email": doc.email, "name": doc.name, "googleId": doc.googleId}});
                        return false;
                    }
                }
                else {
                     res.send({error: 'User not logged in'});
                }

            });

           /* console.log('error: User not registered');
            res.send({success: docs});*/

        }).catch(next);
});
