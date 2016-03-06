angular.module("mission", []);

angular.module("mission").directive("mission", function(){
    return {
        restrict: "E",
        templateUrl: "app/components/mission-view.html"
    };
});