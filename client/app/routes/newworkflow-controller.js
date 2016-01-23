angular.module("newworkflow", ["ngRoute", "addworkflow", "sidebar"]);

angular.module("newworkflow").config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/newworkflow", {templateUrl: "app/routes/newworkflow-view.html", controller: "NewworkflowController"});
}]);

angular.module("newworkflow").controller("NewworkflowController", ["$http", function($http){

    this.nflow = {};

	this.addFlow = function(){
        var data = $.param({
            json: JSON.stringify({
                name: this.nflow.name,
                description: this.nflow.description,
                website: this.nflow.website,
                image: this.nflow.image,
                author: this.nflow.author,
                domainSpecific: this.nflow.domainSpecific
            })
        });
		$http.post('//aleph.inesc-id.pt\:5000/workflows', data)
			.success(function(data, status) {
				console.log('Successfuly posted new workflow: ' + data);
                window.location = '/#workflows';
			})
			.error(function(data, status){
				console.log("Could not insert: " + data);
			});

        this.nflow = {};

	};

}]);

