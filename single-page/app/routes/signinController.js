angular.module("signin", ["ngRoute"]);

angular.module("signin").config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/signin", {templateUrl: "app/routes/signinView.html", controller: "SigninController"});
}]);

angular.module("signin").controller("SigninController", ["$scope", function($scope){

}]);
