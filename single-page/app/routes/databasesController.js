angular.module("databases", ["ngRoute", "pipelines"]);

angular.module("databases").config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/databases", {templateUrl: "app/routes/databasesView.html", controller: "DatabasesController"});
}]);

angular.module("databases").controller("DatabasesController", ["$scope", function($scope){

}]);