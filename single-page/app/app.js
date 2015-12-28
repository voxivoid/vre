var app = angular.module("vre", ["ngRoute", "navbar", "footer", "home", "signin", "auth", "workflows", "pipelines", "biosurf", "biosurfpipeline"]);

app.config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.otherwise({redirectTo: "/"});
}]);

