var app = angular.module("vre", ["ngRoute", "navbar", "footer", "home", "signin", "workflows", "protocols", "databases", "pubdatas",
	"news", "rest", "tools", "start", "about", "tutorials", "profile"]);

angular.module("vre").controller("vreController", ["$scope" ,"$http", "$location", "$window",
    function ($scope,$http,$location,$window) {
	$scope.isAuthenticated = false; // used to know if the user is logged in

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


		$scope.$on('$viewContentLoaded', function(event) {
			$window.ga('send', 'pageview', { page: $location.url() });
		});


}]);

app.config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.otherwise({redirectTo: "/"});
}]);

