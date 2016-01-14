var mongo		= require('mongodb'),
    MongoClient = require('mongodb').MongoClient,
    Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

    var server = new Server('daleth', 27017, {auto_reconnect: true});
db = new Db('vre', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'vre' database");
    }
});
