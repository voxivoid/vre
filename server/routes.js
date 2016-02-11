"use strict";

module.exports = function (app) {

	var handlers = require("require-dir")("./handlers");

    app.delete('/vre/api/delete/:collection/:id',           handlers["api-delete"]);

	app.post('/vre/api/create/:collection',                 handlers["api-create"]);
    app.post('/vre/api/edit/:collection/:id',               handlers["api-edit"]);

	app.get('/vre/api/:collection',                         handlers["api-get"]);
    app.get('/vre/api/:collection/:id',                     handlers["api-get-id"]);

	app.put('/vre/api/reviews/:collection/:id',             handlers["api-reviews-put"]);
	app.put('/vre/api/reviews/:collection/:docid/:revid',   handlers["api-reviews-delete"]);

}