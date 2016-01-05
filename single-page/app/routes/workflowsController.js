angular.module("workflows", ["ngRoute", "pipelines", "sidebar"]);

angular.module("workflows").config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/workflows", {templateUrl: "app/routes/workflowsView.html", controller: "WorkflowsController"});
}]);

angular.module("workflows").controller("ReviewController", function(){

    this.review = {};

    this.addReview = function(pflow){
      pflow.reviews.push(this.review);
      this.review = {};
    };

  });

angular.module("workflows").controller("WorkflowsController", function(){
this.pubflows =
  [
   {
			name: "BioSurfDB",
			description: "A curated relational information system currently integrating 9378 Organism to Pathway networks, 47 documented bioremediation experiments and a 96 biosurfactants curated list.",
			link: "#/workflows/detail/biosurf",
			website: "//biosurfdb.org",
			image: "images/workflows/biosurf-pipeline.png",
			author: "Jorge Oliveira",
			reviews: [
 {
	stars: 5,
  body: "I have used a similar pipeline, it is simple and gives decent informatiton regarding your dataset",
	author: "jso@kdbio.inesc-id.pt"
 }
 ],
			domainspecific: true
   }
	];

	this.buttons = ["Add Workflow","My Workflows","My Area", "My Profile"];
});
