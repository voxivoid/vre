angular.module("pipelines", []);

angular.module("pipelines").directive("pipelines", function(){
	return {
		restrict: "E",
		templateUrl: "app/components/pipelinesView.html"
	};
});

