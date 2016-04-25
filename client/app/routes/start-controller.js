// Get started page controller
angular.module("start", ["ngRoute", "mission", "tutorial"]);

angular.module("start").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/getstarted", {templateUrl: "app/routes/start-view.html", controller: "StartController"});
}]);

angular.module("start").controller("StartController", []);
