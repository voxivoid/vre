angular.module("profile", ["ngRoute"]);

angular.module("profile").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/profile", {templateUrl: "app/routes/profile-view.html", controller: "ProfileController"});
}]);

angular.module("profile").controller("ProfileController", ["$scope", function($scope){

}]);