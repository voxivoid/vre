angular.module("workflows", ["ngRoute", "pipelines", "sidebar"]);

angular.module("workflows").config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/workflows", {templateUrl: "app/routes/workflowsView.html", controller: "WorkflowsController"});
}]);

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
			domainspecific: true
   }
	];

	this.buttons = ["Add Workflow","My Workflows","My Area", "My Profile"];
});
