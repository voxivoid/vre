angular.module("detail", ["ngRoute", "biosurf"]);

angular.module("detail").config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/workflows/detail/biosurf", {templateUrl: "app/routes/detailView.html", controller: "DetailController"});
}]);

angular.module("detail").controller("DetailController", ["$scope", function($scope){

}]);