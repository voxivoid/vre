angular.module("workflows", ["ngRoute", "pipelines", "sidebar"]);

angular.module("workflows").config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/workflows", {templateUrl: "app/routes/workflows-view.html", controller: "WorkflowsController"});
}]);


angular.module("workflows").controller("ReviewController", function(){

    this.review = {};

    this.addReview = function(pflow){
      pflow.reviews.push(this.review);
      this.review = {};
    };

  });

angular.module("workflows").controller("WorkflowsController", ['$http', function($http){
	var workflows = this;

	workflows.pubflows = [ ];

	$http.get('//aleph.inesc-id.pt\:5000/workflows').success(function(data){
		workflows.pubflows = data;
	});

	this.buttons = ["Add Workflow","My Workflows","My Area", "My Profile"];
}]);
