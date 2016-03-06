var app = angular.module("vre", ["ngRoute", "navbar", "footer", "home", "signin", "workflows", "databases", "detail", "rest", "tools", "start", "about", "tutorials"]);

app.config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.otherwise({redirectTo: "/"});
}]);

