var app = angular.module("vre", ["ngRoute", "navbar", "footer", "home", "signin", "auth", "workflows", "pipelines", "biosurfpipeline", "biosurf"]);

app.config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.otherwise({redirectTo: "/"});
}]);

