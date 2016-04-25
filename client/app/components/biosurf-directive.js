// This directive is used to present a custom detailed view for biosurf workflow
angular.module("biosurf", []);

angular.module("biosurf").directive("biosurf", function(){
	return {
		restrict: "E",
		templateUrl: "app/components/biosurf-view.html"
	};
});