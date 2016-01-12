angular.module("api", ["ngRoute"]);

angular.module("api").config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/api", {templateUrl: "app/routes/apiView.html", controller: "ApiController"});
}]);

angular.module("api").controller("ApiController", ["$scope", function($scope){

}]);
