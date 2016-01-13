(function(){
	var app = angular.module("footer", []);

	app.directive("footer", function(){
		return {
			restrict: "E",
			templateUrl: "app/components/footer-view.html"
		};
	});
})();
