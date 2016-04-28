// About page controller
angular.module("about", ["ngRoute", "mission"]);

angular.module("about").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/about", {templateUrl: "app/routes/about-view.html", controller: "AboutController"});
}]);

angular.module("about").controller("AboutController", ["$scope", function($scope){

}]);