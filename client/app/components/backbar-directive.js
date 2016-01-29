/**
 * Created by rmfigueiredo on 29/01/16.
 */
angular.module("backbar", []);

angular.module("backbar").directive("backbar", function(){
    return {
        restrict: "E",
        templateUrl: "app/components/backbar-view.html"
    };
});

