angular.module("biosurf", ["ngRoute"]);

angular.module("biosurf").config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/workflows/biosurf", {templateUrl: "app/routes/biosurfView.html", controller: "biosurfController"});
}]);

angular.module("biosurf").controller("BiosurfController", ["$scope", function($scope){

}]);
