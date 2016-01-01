angular.module("sidebar", []);

angular.module("sidebar").directive("sidebar", function(){
	return {
		restrict: "E",
		templateUrl: "app/components/sidebarView.html"
	};
});
