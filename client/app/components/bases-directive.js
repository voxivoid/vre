angular.module("bases", []);

angular.module("bases").directive("bases", function(){
	return {
		restrict: "E",
		templateUrl: "app/components/bases-view.html"
	};
});
