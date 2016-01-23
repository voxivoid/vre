angular.module("newworkflow", ["ngRoute", "addworkflow", "sidebar"]);

angular.module("newworkflow").config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/newworkflow", {templateUrl: "app/routes/newworkflow-view.html", controller: "NewworkflowController"});
}]);

angular.module("newworkflow").controller("NewworkflowController", ["$http", "$location", function($http, $location){

    this.nflow = {};

	this.addFlow = function(){
        var data = $.param({
            json: JSON.stringify({
                this.nflow
            })
        });
		$http.post('//aleph.inesc-id.pt\:5000/workflows', data)
			.success(function(data, status) {
				console.log('Successfuly posted new workflow: ' + data;
                $location.path('/#workflows')
			})
			.error(function(data, status){
				console.log("Could not insert: " + data);
			});

        this.nflow = {};

	};

}]);

