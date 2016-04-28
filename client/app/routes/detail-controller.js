// Biosurf custom detail controller
angular.module("detail", ["ngRoute", "biosurf", "backbar"]);

angular.module("detail").config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/workflows/detail/biosurf", {templateUrl: "app/routes/detail-view.html", controller: "DetailController"});
}]);

angular.module("detail").controller("DetailController", ["$scope", function($scope){

}]);