angular.module("pipelines", []);

angular.module("pipelines").directive("pipelines", function(){
	return {
		restrict: "E",
		templateUrl: "app/components/pipelines-view.html",
	};
});

angular.module("pipelines").controller("ReviewController", function(){
	this.review = {};

	this.addReview = function(pflow){
		pflow.reviews.push(this.review);
		this.review = {};
	};
});

angular.module("pipelines").controller("WorkflowsController", ['$http', function($http){
	var workflows = this;

	workflows.pubflows = [ ];

	$http.get('//aleph.inesc-id.pt/vre/api/workflows').success(function(data){
		if(data.success) {
			workflows.pubflows = data.success;
		}
	});

	this.buttons = ["Add Workflow","My Workflows","My Area", "My Profile"];
	this.links = ["#/workflow/new","#","#","#"];

	var rev = this;

	this.getReview = function(review_id){
		$http.get('//aleph.inesc-id.pt/vre/api/review/' + review_id).success(function(data){
			if(data.success) {
				rev = data.success;
			}
		});
	};
}]);



