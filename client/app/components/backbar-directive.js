// This directive is used to present a back button
angular.module("backbar", []);

angular.module("backbar").directive("backbar", function(){
    return {
        restrict: "E",
        templateUrl: "app/components/backbar-view.html"
    };
});

