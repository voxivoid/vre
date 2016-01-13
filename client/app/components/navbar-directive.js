angular.module("navbar", []);

angular.module("navbar").directive("navbar", function(){
	return {
		restrict: "E",
		templateUrl: "app/components/navbar-view.html"
	};
});
