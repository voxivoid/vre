angular.module("biosurfpipeline", []);

angular.module("biosurfpipeline").directive("biosurfpipeline", function(){
	return {
		restrict: "E",
		templateUrl: "app/components/biosurfpipelineView.html"
	};
});

