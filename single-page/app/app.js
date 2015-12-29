var app = angular.module("vre", ["ngRoute", "navbar", "footer", "home", "signin", "auth", "explore", "pipelines", "biosurf", "detail"]);

app.config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.otherwise({redirectTo: "/"});
}]);

