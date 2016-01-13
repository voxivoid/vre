angular.module("auth", ["directive.g+signin"]);

angular.module("auth").directive("auth", function(){
	return {
		restrict: "E",
		templateUrl: "app/components/auth-view.html"
	};
});

