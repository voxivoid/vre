angular.module("vre.home", ["ngRoute", "carousel", "quicktools"]);

angular.module("vre.home").config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/", {templateUrl: "app/routes/homeView.html", controller: "HomeController"});
}]);

angular.module("vre.home").controller("HomeController", ["$scope", function($scope){

}]);
