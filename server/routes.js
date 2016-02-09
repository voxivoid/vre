"use strict";

module.exports = function (app) {

	var handlers = require("require-dir")("./handlers");

	app.get('/vre/api/databases', handlers["api-databases-get"]);
	app.post('/vre/api/databases', handlers["api-databases-create"]);
	app.get('/vre/api/databases/:id', handlers["api-databases-get-id"]);
    app.delete('/vre/api/databases/delete/:id', handlers["api-databases-delete"]);
	app.post('/vre/api/databases/edit/:id', handlers["api-databases-edit"]);

	app.get('/vre/api/workflows', handlers["api-workflows-get"]);
	app.post('/vre/api/workflows', handlers["api-workflows-create"]);
	app.get('/vre/api/workflows/:id', handlers["api-workflows-get-id"]);
    app.delete('/vre/api/workflows/delete/:id', handlers["api-workflows-delete"]);
	app.post('/vre/api/workflows/edit/:id', handlers["api-workflows-edit"]);

	app.put('/vre/api/workflows/reviews/:id', handlers["api-workflows-reviews-put"]);
	app.put('/vre/api/workflows/reviews/:workflow/:review', handlers["api-workflows-reviews-delete"]);
	app.get('/vre/api/reviews', handlers["api-reviews-get"]);
	app.get('/vre/api/review/:id', handlers["api-review-get-id"]);
	app.delete('/vre/api/review/delete/:id', handlers["api-review-delete"]);
};