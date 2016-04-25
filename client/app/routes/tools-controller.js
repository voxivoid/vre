angular.module("tools", ["ngRoute", "sidebar", "documents", "reviews"]);

angular.module("tools").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/tools", {templateUrl: "app/routes/tools-view.html", controller: "ToolsController"})
        .when("/tools/self", {templateUrl: "app/routes/tools-view.html", controller: "MyToolsController"})
        .when("/tools/new", {templateUrl: "app/routes/tools-create-view.html", controller: "NewToolsController"});
}]);

angular.module("tools").controller("ToolsController", ['$scope', '$http', function($scope, $http){
    $scope.toolsCtrl = this;
    $scope.type = "tools";

    this.tools = [];
    $http.get('//aleph.inesc-id.pt/vre/api/' + $scope.type).success(function(data){
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

angular.module("tools").controller("MyToolsController", ['$scope', '$http', function($scope, $http){
    $scope.toolsCtrl = this;
    $scope.type = "tools";

    this.tools = [];
    $http.get('//aleph.inesc-id.pt/vre/api/' + $scope.type + "?self=true").success(function(data){
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