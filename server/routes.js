// Declaration of all possible routes
"use strict";

module.exports = function (app) {
	var handlers = require("require-dir")("./handlers");
	var homeUrl = "http://aleph.inesc-id.pt/vre/";
	app.get('/vre/api/auth/google/callback', app.passport.authenticate('google', {
		successRedirect : homeUrl + '#/profile',
		failureRedirect : homeUrl + '#/signin'
	}));
	app.get('/vre/api/auth/google', app.passport.authenticate('google', {
		scope : ['profile', 'email']
	}));
	app.get('/vre/api/auth/google/logout', function(req, res) {
		req.logout();
		res.redirect(homeUrl);
	});
	app.get('/vre/api/auth/google/isauthenticated', function (req, res, next) {
		if(req.isAuthenticated()) res.send({success: "User is logged in."});
		else res.send({error: "User isn't logged in."});
	});

	app.get('/vre/api/userinfo/', handlers["api-user-info"]);
	app.get('/vre/api/reviews/', handlers["api-get-reviews"]);
    app.put('/vre/api/reviews/:collection/:id', isAuthenticated, handlers["api-reviews-put"]);
    app.delete('/vre/api/reviews/:collection/:docid/:revid', isAuthenticated, handlers["api-reviews-delete"]);

    app.get('/vre/api/:collection', handlers["api-get"]);
	app.get('/vre/api/:collection/:id', handlers["api-get-id"]);
    app.delete('/vre/api/delete/:collection/:id', isAuthenticated, handlers["api-delete"]);
	app.post('/vre/api/create/:collection', isAuthenticated, handlers["api-create"]);
    app.post('/vre/api/edit/:collection/:id', isAuthenticated, handlers["api-edit"]);

	function isAuthenticated(req, res, next) {
		if (req.isAuthenticated())
			return next();
		res.redirect('/');
	};

};
