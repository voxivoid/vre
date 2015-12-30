angular.module("workflows", ["ngRoute", "pipelines"]);

angular.module("workflows").config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/workflows", {templateUrl: "app/routes/workflowsView.html", controller: "WorkflowsController"});
}]);

angular.module("workflows").controller("WorkflowsController", ["$scope", function($scope){

}]);
