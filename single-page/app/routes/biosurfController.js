angular.module("biosurf", ["ngRoute", "biosurfpipeline"]);

angular.module("biosurf").config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/workflows/biosurf", {templateUrl: "app/routes/biosurfView.html", controller: "BiosurfController"});
}]);

angular.module("biosurf").controller("BiosurfController", ["$scope", function($scope){

}]);
