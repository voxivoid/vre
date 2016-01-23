angular.module("newworkflow", ["ngRoute", "addworkflow", "sidebar"]);

angular.module("newworkflow").config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/newworkflow", {templateUrl: "app/routes/newworkflow-view.html", controller: "NewworkflowController"});
}]);

angular.module("newworkflow").controller("NewworkflowController", ["$http", function($http){

	this.addFlow = function(){
		$http.post('//aleph.inesc-id.pt\:5000/workflows', this.nflow)
			.success(function(this.nflow) {
				console.log('Successfuly posted new workflow: ' + this.nflow);
			})
			.error(function(){
				console.log("Could not insert: " + this.nflow);
			});
	};

	this.nflow = {};

}]);

