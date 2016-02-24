var app = angular.module("vre", ["ngRoute", "navbar", "footer", "home", "signin", "workflows", "databases", "detail", "rest", "tools"]);

app.config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.otherwise({redirectTo: "/"});
}]);

