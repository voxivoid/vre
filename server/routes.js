"use strict";

module.exports = function (app) {
	var handlers = require("require-dir")("./handlers");
	var homeUrl = "http://aleph.inesc-id.pt/~voxivoid/vre/client/";
	app.get('/vre/api/auth/google/callback', app.passport.authenticate('google', {
		successRedirect : homeUrl,
		failureRedirect : homeUrl + '#/signin'
	}));
	app.get('/vre/api/auth/google', app.passport.authenticate('google', { scope : ['profile', 'email'] }));
	app.get('/vre/api/auth/google/logout', function(req, res) {
		req.logout();
		res.redirect(homeUrl);
	});
	app.get('/vre/api/auth/google/isauthenticated', function (req, res, next) {
		if(req.isAuthenticated()) res.send({success: "User is logged in."});
		else res.send({error: "User isn't logged in."});
	});
	
	app.get('/vre/api/:collection', handlers["api-get"]);
	app.get('/vre/api/:collection/:id', handlers["api-get-id"]);
    app.delete('/vre/api/delete/:collection/:id', isAuthenticated, handlers["api-delete"]);
	app.post('/vre/api/create/:collection', isAuthenticated, handlers["api-create"]);
    app.post('/vre/api/edit/:collection/:id', isAuthenticated, handlers["api-edit"]);

	app.put('/vre/api/reviews/:collection/:id', isAuthenticated, handlers["api-reviews-put"]);
	app.put('/vre/api/reviews/:collection/:docid/:revid', isAuthenticated, handlers["api-reviews-delete"]);

	function isAuthenticated(req, res, next) {
		if (req.isAuthenticated())
			return next();
		res.redirect('/');
	};

};
