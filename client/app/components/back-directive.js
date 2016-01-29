/**
 * Created by rmfigueiredo on 29/01/16.
 */
angular.module("back", []);

angular.module("back").directive("back", function(){
    return {
        restrict: "E",
        templateUrl: "app/components/back-view.html"
    };
});

