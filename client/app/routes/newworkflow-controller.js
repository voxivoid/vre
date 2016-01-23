angular.module("newworkflow", ["ngRoute", "addworkflow", "sidebar"]);

angular.module("newworkflow").config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/newworkflow", {templateUrl: "app/routes/newworkflow-view.html", controller: "NewworkflowController"});
}]);

angular.module("newworkflow").controller("NewworkflowController", ["$http", function($http, $scope){

    $scope.nflow = {};

	$scope.addFlow = function(nflow){
		$http.post('//aleph.inesc-id.pt\:5000/workflows', nflow)
			.success(function() {
				console.log('Successfuly posted new workflow: ' + nflow);
			})
			.error(function(){
				console.log("Could not insert: " + nflow);
			});

        $scope.nflow = {};
	};

}]);

