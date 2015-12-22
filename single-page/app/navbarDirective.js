(function(){
	var app = angular.module("navbar", []);

	app.directive("navbar", function(){
		return {
			restrict: "E",
			templateUrl: "app/navbarView.html"
		};
	});
})();