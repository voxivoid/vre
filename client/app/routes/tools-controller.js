angular.module("tools", ["ngRoute", "sidebar", "tool-new"]);

angular.module("tools").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/tools", {templateUrl: "app/routes/tools-view.html", controller: "ToolsController"})
        .when("/tools/self", {templateUrl: "app/routes/tools-view.html", controller: "MyToolsController"});
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

    this.delTool = function(docid){
        $http.delete('//aleph.inesc-id.pt/vre/api/delete/' + $scope.type + '/' + docid)
            .success(function () {
                console.log('Successfuly removed ' + $scope.type + ' with id ' + docid);
                location.reload();
            })
            .error(function () {
                console.log("Error: Could not remove document");
            });
    };

}]);

angular.module("tool-new", ["ngRoute"]);

angular.module("tool-new").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/tools/new", {templateUrl: "app/routes/tool-create-view.html", controller: "ToolNewController"});
}]);

angular.module("tool-new").controller("ToolNewController", ["$http", function($http) {
    this.ntool= {};

    this.addBase = function(){
        $http.post('//aleph.inesc-id.pt/vre/api/create/tools', this.ntool)
            .success(function () {
                //console.log('Successfuly posted new tool');
                window.location = '#/external';
            })
            .error(function () {
                console.log("Error: Could not insert");
            });
        this.ntool = {};
    };
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

    this.delTool = function(docid){
        $http.delete('//aleph.inesc-id.pt/vre/api/delete/' + $scope.type + '/' + docid)
            .success(function () {
                console.log('Successfuly removed ' + $scope.type + ' with id ' + docid);
                location.reload();
            })
            .error(function () {
                console.log("Error: Could not remove document");
            });
    };
}]);
