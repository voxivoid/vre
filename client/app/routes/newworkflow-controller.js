angular.module("newworkflow", ["ngRoute", "addworkflow", "sidebar"]);

angular.module("newworkflow").config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/newworkflow", {templateUrl: "app/routes/newworkflow-view.html", controller: "NewworkflowController"});
}]);

angular.module("newworkflow").controller("NewworkflowController", ["$http", function($http){

	this.nflow = {};

	this.addFlow = function(){
		$http.post('//aleph.inesc-id.pt\:5000/workflows', nflow)
			.success(function(nflow) {
				console.log('Successfuly posted new workflow: ' + nflow);
			})
			.error(function(){
				console.log("Could not insert: " + nflow);
			});
	};

	this.nflow = {};

}]);

