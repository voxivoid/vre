angular.module("newworkflow", ["ngRoute", "addworkflow", "sidebar"]);

angular.module("newworkflow").config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/newworkflow", {templateUrl: "app/routes/newworkflow-view.html", controller: "NewworkflowController"});
}]);

angular.module("newworkflow").controller("NewworkflowController", ["$http", function($http, $scope){

	$scope.addFlow = function(){
		$http.post('//aleph.inesc-id.pt\:5000/workflows', $scope.nflow)
			.success(function($scope.nflow) {
				console.log('Successfuly posted new workflow: ' + $scope.nflow);
			})
			.error(function(){
				console.log("Could not insert: " + $scope.nflow);
			});
	};

	$scope.nflow = {};

}]);

