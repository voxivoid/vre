var app = angular.module("vre", ["ngRoute", "navbar", "footer", "home", "signin", "auth"]);

app.config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.otherwise({redirectTo: "/"});
}]);

