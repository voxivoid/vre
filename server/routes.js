"use strict";

module.exports = function (app) {

	var handlers = require("require-dir")("./handlers");

	app.get('/vre/api/databases', handlers["api-databases-get-public"]);
	app.post('/vre/api/databases', handlers["api-databases-post-public"]);
	app.get('/databases/:id', handlers["api-databases-get-public-id"]);
	/*app.put('/databases/:id', handlers["api-databases-put"]);
	app.delete('/databases/:id', handlers["api-databases-delete"]);*/

	app.get('/vre/api/workflows', handlers["api-workflows-get-public"]);
	app.post('/vre/api/workflows', handlers["api-workflows-post-public"]);
	app.get('/vre/api/workflows/:id', handlers["api-workflows-get-public-id"]);
	/*app.put('/workflows/:id', handlers["api-workflows-put"]);
	app.delete('/workflows/:id', handlers["api-workflows-delete"]);

	app.post('/workflows/reviews/:id', handlers["api-workflows-reviews-post-public"]);*/

}
