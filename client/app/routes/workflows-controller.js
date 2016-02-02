angular.module("workflows", ["ngRoute", "pipelines", "sidebar", "workflow-new"]);

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

angular.module("workflows").controller("WorkflowsController", ['$scope', '$http', function($scope, $http){
	$scope.type = "workflows";

	var workflows = this;
	workflows.pubflows = [];
	$http.get('//aleph.inesc-id.pt/vre/api/workflows').success(function(data){
		if(data.success) {
			workflows.pubflows = data.success;
		}
	});

    var rev = this;
    this.getReview = function(review_id){
        $http.get('//aleph.inesc-id.pt/vre/api/review/' + review_id).success(function(data){
            if(data.success) {
               rev = data.success;
            }
        });
    };
}]);

angular.module("workflow-new", ["ngRoute", "addworkflow", "sidebar"]);

angular.module("workflow-new").config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/workflow/new", {templateUrl: "app/routes/workflow-create-view.html", controller: "WorkflowNewController"});
}]);

angular.module("workflow-new").controller("WorkflowNewController", ["$http", function($http) {
	this.nflow = {};

	this.addFlow = function(){
		$http.post('//aleph.inesc-id.pt/vre/api/workflows', this.nflow)
			.success(function () {
				console.log('Successfuly posted new workflow');
				window.location = '#/workflows';
			})
			.error(function () {
				console.log("Error: Could not insert");
			});
		this.nflow = {};
	};
}]);
