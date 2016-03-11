angular.module("auth", []);

angular.module("auth").directive("auth", function(){
	return {
		restrict: "E",
		templateUrl: "app/components/auth-view.html"
	};
});

