angular.module("tutorials", ["ngRoute", "tutorial"]);

angular.module("tutorials").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/tutorials", {templateUrl: "app/routes/tutorials-view.html", controller: "TutorialsController"});
}]);

angular.module("tutorials").controller("TutorialsController", ["$scope", function($scope){

}]);