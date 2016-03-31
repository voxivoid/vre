"use strict";

var handlers = module.exports = [];

handlers.push(function(req, res, next) {

    var Document = req.app.db.models.Review;

    Promise.all(Document.find())
        .then(function(docs){
            docs=docs.map(function(doc){
            doc = doc.toObject();
            doc.hasPermissions = false;

         /*   if(req.user) {
                for(var i = 0; i < doc.users.length; i++){
                    if("" + doc.users[i] === "" + req.user._id){
                        doc.hasPermissions = true;
                    }
                }
            }*/

            delete doc.users;
            return doc;

        });

    res.send({success: docs});

}).catch(next);

});
