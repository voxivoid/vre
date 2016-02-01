angular.module("signin", ["ngRoute", "auth"]);

angular.module("signin").config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/signin", {templateUrl: "app/routes/signin-view.html", controller: "SigninController"});
}]);

angular.module("signin").controller("SigninController", ["$scope", function($scope){

}]);
