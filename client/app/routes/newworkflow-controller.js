angular.module("newworkflow", ["ngRoute", "addworkflow", "sidebar"]);

angular.module("newworkflow").config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/newworkflow", {templateUrl: "app/routes/newworkflow-view.html", controller: "NewworkflowController"});
}]);

angular.module("newworkflow").controller("NewworkflowController", ["$http", "$window", "$scope", function($http, $window, $scope){

	$scope.addFlow = function(nflow){
		$http.post('//aleph.inesc-id.pt\:5000/workflows', nflow)
			.success(function() {
				console.log('Successfuly posted new workflow: ' + nflow);
                $window.location.href = '#/workflows';
			})
			.error(function(){
				console.log("Could not insert: " + nflow);
			});

	};

}]);

