angular.module("biosurf", []);

angular.module("biosurf").directive("biosurf", function(){
	return {
		restrict: "E",
		templateUrl: "app/components/biosurfView.html"
	};
});

