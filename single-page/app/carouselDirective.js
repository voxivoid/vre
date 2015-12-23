(function(){
	var app = angular.module("carousel", []);

	app.directive("carousel", function(){
		return {
			restrict: "E",
			templateUrl: "app/carouselView.html"
		};
	});
})();
