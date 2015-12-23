(function(){
	var app = angular.module("quicktools", []);

	app.directive("quicktools", function(){
		return {
			restrict: "E",
			templateUrl: "app/quicktoolsView.html"
		};
	});
})();
