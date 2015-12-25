var app = angular.module("vre", ["ngRoute", "navbar", "vre.home"]);

app.config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.otherwise({redirectTo: "/"});
}]);
