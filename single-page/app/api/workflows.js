/*var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('daleth', 27017, {auto_reconnect: true});
db = new Db('vre', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'vre' database");
/*        db.collection('pubflows', {strict:true}, function(err, collection) {
            if (err) {
                console.log("Cannot access to 'pubflows' collection:");
								console.log(err);
            }
        });
    }
});
*/
exports.findByIdPubflow = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving pflow: ' + id);
    db.collection('pubflows', function(err, collection) {
        collection.findOne({'_id':new require('mongodb').ObjectID(req.params.id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAllPubflow = function(req, res) {
    db.collection('pubflows', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addPubflow = function(req, res) {
    var pflow = req.body;
    console.log('Adding workflow: ' + JSON.stringify(pflow));
    db.collection('pubflows', function(err, collection) {
        collection.insert(pflow, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updatePubflow = function(req, res) {
    var id = req.params.id;
    var pflow = req.body;
    console.log('Updating workflow: ' + id);
    console.log(JSON.stringify(pflow));
    db.collection('pubflows', function(err, collection) {
        collection.update({'_id':new require('mongodb').ObjectID(req.params.id)}, pflow, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating workflow: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(pflow);
            }
        });
    });
}

exports.deletePubflow = function(req, res) {
    var id = req.params.id;
    console.log('Deleting workflow: ' + id);
    db.collection('pubflows', function(err, collection) {
        collection.remove({'_id':new require('mongodb').ObjectID(req.params.id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

