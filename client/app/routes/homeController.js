angular.module("home", ["ngRoute", "carousel", "quicktools"]);

angular.module("home").config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/", {templateUrl: "app/routes/homeView.html", controller: "HomeController"});
}]);

angular.module("home").controller("HomeController", ["$scope", function($scope){

}]);
