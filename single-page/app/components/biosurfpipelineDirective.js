angular.module("biosurfpipeline", []);

angular.module("biosurfpipeline").directive("biosurfpipeline", function(){
	return {
		restrict: "E",
		templateUrl: "app/components/biosurfpipelineView.html"
	};
});

app.run(function($rootScope, $location, $anchorScroll, $routeParams) {
  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    $location.hash($routeParams.scrollTo);
    $anchorScroll();  
  });
});

