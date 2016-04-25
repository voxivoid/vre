// This directive is used to present authentication methods to the user like Google auth
angular.module("auth", []);

angular.module("auth").directive("auth", function(){
	return {
		restrict: "E",
		templateUrl: "app/components/auth-view.html"
	};
});

