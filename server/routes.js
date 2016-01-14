"use strict";

module.exports = function (app) {

	var handlers = require("require-dir")("./handlers");

	app.get('/databases', handlers["api-databases-get-public"]);
	/*app.get('/databases/:id', handlers["api-databases-get-public-id"]);
	app.post('/databases', handlers["api-databases-post-public"]);
	app.put('/databases/:id', handlers["api-databases-put"]);
	app.delete('/databases/:id', handlers["api-databases-delete"]);

	app.get('/workflows', handlers["api-workflows-get-public"]);
	app.get('/workflows/:id', handlers["api-workflows-get-public-id"]);
	app.post('/workflows', handlers["api-workflows-post-public"]);
	app.put('/workflows/:id', handlers["api-workflows-put"]);
	app.delete('/workflows/:id', handlers["api-workflows-delete"]);*/

}