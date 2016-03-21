"use strict";

module.exports = function (app) {
	var handlers = require("require-dir")("./handlers");

	app.get('/vre/api/auth/google/callback', handlers["auth-callback"]);
	app.get('/vre/api/auth/google', app.passport.authenticate('google', { scope : ['profile', 'email'] }));
	app.get('/vre/api/auth/google/isauthenticated', function isAuthenticated(req, res, next) {
		if(req.isAuthenticated()) res.send({success: "User is logged in."});
		else res.send({error: "User isn't logged in."});
	});
	
	app.get('/vre/api/:collection',                         handlers["api-get"]);
	app.get('/vre/api/:collection/:id',                     handlers["api-get-id"]);
    app.delete('/vre/api/delete/:collection/:id',           handlers["api-delete"]);
	app.post('/vre/api/create/:collection',                 handlers["api-create"]);
    app.post('/vre/api/edit/:collection/:id',               handlers["api-edit"]);

	app.put('/vre/api/reviews/:collection/:id',             handlers["api-reviews-put"]);
	app.put('/vre/api/reviews/:collection/:docid/:revid',   handlers["api-reviews-delete"]);

	function isAuthenticated(req, res, next) {
		if (req.isAuthenticated())
			return next();
		res.redirect('/');
	};

};
