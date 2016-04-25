// This directive presents the navigation bar at the top of the vre
angular.module("navbar", []);

angular.module("navbar").directive("navbar", function(){
	return {
		restrict: "E",
		templateUrl: "app/components/navbar-view.html",
		controller: function($scope, $location){
			$scope.isActive = function (viewLocation) {
				return viewLocation === $location.path();
			};
		}
	};
});