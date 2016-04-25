// This directive is used to present the vre tutorial
angular.module("tutorial", []);

angular.module("tutorial").directive("tutorial", function(){
    return {
        restrict: "E",
        templateUrl: "app/components/tutorial-view.html"
    };
});