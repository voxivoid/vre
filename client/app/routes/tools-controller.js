angular.module("tools", ["ngRoute", "sidebar", "documents", "reviews"]);

angular.module("tools").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/tools", {templateUrl: "app/routes/tools-view.html", controller: "ToolsController"})
        .when("/tools/self", {templateUrl: "app/routes/tools-view.html", controller: "ToolsController"})
        .when("/tools/new", {templateUrl: "app/routes/tools-create-view.html", controller: "NewToolsController"});
}]);

angular.module("tools").controller("ToolsController", ['$location', '$scope', '$http', function($location, $scope, $http){
    $scope.toolsCtrl = this;
    $scope.type = "tools";

    var getUrl;
    if($location.path() === "/tools/self"){
        getUrl = '//aleph.inesc-id.pt/vre/api/' + $scope.type + "?self=true";
    } else{
        getUrl = '//aleph.inesc-id.pt/vre/api/' + $scope.type;
    }

    this.tools = [];
    $http.get(getUrl).success(function(data){
        if(data.success) {
            $scope.toolsCtrl.tools = data.success;
            $scope.$broadcast('toolsReady', $scope.toolsCtrl.tools);
        }
    });

    $scope.$on('toolsReady', function(event, tools) {
        angular.forEach($scope.toolsCtrl.tools, function(toolObject, toolIndex){
            angular.forEach(toolObject.reviews, function(reviewObject, reviewIndex) {
                $http.get('//aleph.inesc-id.pt/vre/api/reviews/' + reviewObject).success(function(data){
                    if(data.success) {
                        //console.log('got tool review ' + reviewObject);
                        $scope.toolsCtrl.tools[toolIndex].reviews[reviewIndex] = data.success;
                    }
                });
            })
        })
    });
}]);

angular.module("tools").controller("NewToolsController", ["$scope", function($scope) {
    $scope.type = "tools";
}]);