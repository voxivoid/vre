var app = angular.module("vre", ["ngRoute", "navbar", "footer", "home", "signin", "workflows", "databases", "pubdatas",
	"news", "detail", "rest", "tools", "start", "about", "tutorials"]);

angular.module("vre").controller("vreController", ["$scope" ,"$http", function ($scope,$http) {
	$scope.isAuthenticated = false;

	$http.get('http://aleph.inesc-id.pt/vre/api/auth/google/isauthenticated')
		.success(function (data) {
			if(data.success) {
				$scope.isAuthenticated = true;
			}
			else{
				$scope.isAuthenticated = false;
			}
		})
		.error(function () {
			$scope.isAuthenticated = false;
		});
}]);

app.config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.otherwise({redirectTo: "/"});
}]);

