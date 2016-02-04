/*var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('daleth', 27017, {auto_reconnect: true});
db = new Db('vre', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'vre' database");
        db.collection('pubbases', {strict:true}, function(err, collection) {
            if (err) {
                console.log("Cannot access 'pubbases' collection:");
								console.log(err);
            }
        });
    }
});
*/
exports.findByIdPubbase = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving pflow: ' + id);
    db.collection('databases', function(err, collection) {
        collection.findOne({'_id':new require('mongodb').ObjectID(req.params.id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAllPubbase = function(req, res) {
    db.collection('databases', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addPubbase = function(req, res) {
    var pbase = req.body;
    console.log('Adding pubbase: ' + JSON.stringify(pbase));
    db.collection('databases', function(err, collection) {
        collection.insert(pbase, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updatePubbase = function(req, res) {
    var id = req.params.id;
    var pbase = req.body;
    console.log('Updating pubbase: ' + id);
    console.log(JSON.stringify(pbase));
    db.collection('databases', function(err, collection) {
        collection.update({'_id':new require('mongodb').ObjectID(req.params.id)}, pbase, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating pubbase: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(pbase);
            }
        });
    });
}

exports.deletePubbase = function(req, res) {
    var id = req.params.id;
    console.log('Deleting pubbase: ' + id);
    db.collection('databases', function(err, collection) {
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

