var app = angular.module("vre", ["ngRoute", "navbar", "footer", "home", "signin", "auth", "workflows", "pipelines"]);

app.config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.otherwise({redirectTo: "/"});
}]);

