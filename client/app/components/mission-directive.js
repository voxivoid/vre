// This directive is used to present the description of our project in the get started tab
angular.module("mission", []);

angular.module("mission").directive("mission", function(){
    return {
        restrict: "E",
        templateUrl: "app/components/mission-view.html"
    };
});