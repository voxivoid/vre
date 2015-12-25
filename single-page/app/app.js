var app = angular.module("vre", ["ngRoute", "navbar", "footer", "home"]);

app.config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.otherwise({redirectTo: "/"});
}]);

