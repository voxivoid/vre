angular.module("databases", ["ngRoute", "sidebar", "documents", "reviews"]);

angular.module("databases").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/databases", {templateUrl: "app/routes/databases-view.html", controller: "DatabasesController"})
        .when("/databases/self", {templateUrl: "app/routes/databases-view.html", controller: "MyDatabasesController"})
        .when("/databases/new", {templateUrl: "app/routes/database-create-view.html", controller: "NewDatabaseController"});
}]);

angular.module("databases").controller("DatabasesController", ['$scope', '$http', function($scope, $http){
    $scope.databasesCtrl = this;
    $scope.type = "databases";

    this.databases = [];
    $http.get('//aleph.inesc-id.pt/vre/api/' + $scope.type).success(function(data){
        if(data.success) {
            $scope.databasesCtrl.databases = data.success;
            $scope.$broadcast('databasesReady', $scope.databasesCtrl.databases);
        }
    });

    $scope.$on('databasesReady', function(event, databases) {
        angular.forEach($scope.databasesCtrl.databases, function(databaseObject, databaseIndex){
            angular.forEach(databaseObject.reviews, function(reviewObject, reviewIndex) {
                $http.get('//aleph.inesc-id.pt/vre/api/reviews/' + reviewObject).success(function(data){
                    if(data.success) {
                        //console.log('got database review ' + reviewObject);
                        $scope.databasesCtrl.databases[databaseIndex].reviews[reviewIndex] = data.success;
                    }
                });
            })
        })
    });
}]);

angular.module("databases").controller("MyDatabasesController", ['$scope', '$http', function($scope, $http){
    $scope.databasesCtrl = this;
    $scope.type = "databases";

    this.databases = [];
    $http.get('//aleph.inesc-id.pt/vre/api/' + $scope.type + "?self=true").success(function(data){
        if(data.success) {
            $scope.databasesCtrl.databases = data.success;
            $scope.$broadcast('databasesReady', $scope.databasesCtrl.databases);
        }
    });


    $scope.$on('databasesReady', function(event, databases) {
        angular.forEach($scope.databasesCtrl.databases, function(databaseObject, databaseIndex){
            angular.forEach(databaseObject.reviews, function(reviewObject, reviewIndex) {
                $http.get('//aleph.inesc-id.pt/vre/api/reviews/' + reviewObject).success(function(data){
                    if(data.success) {
                        //console.log('got database review ' + reviewObject);
                        $scope.databasesCtrl.databases[databaseIndex].reviews[reviewIndex] = data.success;
                    }
                });
            })
        })
    });
}]);

angular.module("databases").controller("NewDatabaseController", ["$scope", function($scope) {
    $scope.type = "databases";
}]);
