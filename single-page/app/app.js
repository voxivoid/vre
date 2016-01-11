var app = angular.module("vre", ["ngRoute", "navbar", "footer", "home", "signin", "workflows", "databases", "detail", "api"]);

app.config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.otherwise({redirectTo: "/"});
}]);

