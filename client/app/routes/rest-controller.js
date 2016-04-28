// Rest API page controller
angular.module("rest", ["ngRoute"]);

angular.module("rest").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/rest", {templateUrl: "app/routes/rest-view.html", controller: "RestController"});
}]);

angular.module("rest").controller("RestController", ["$scope", function($scope){

}]);