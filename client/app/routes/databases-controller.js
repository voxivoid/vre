angular.module("databases", ["ngRoute", "sidebar", "database-new", "reviews"]);

angular.module("databases").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/databases", {templateUrl: "app/routes/databases-view.html", controller: "DatabasesController"})
        .when("/databases/self", {templateUrl: "app/routes/databases-view.html", controller: "MyDatabasesController"});
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

    this.delBase = function(docid){
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

angular.module("database-new", ["ngRoute"]);

angular.module("database-new").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/databases/new", {templateUrl: "app/routes/database-create-view.html", controller: "DatabaseNewController"});
}]);

angular.module("database-new").controller("DatabaseNewController", ["$http", function($http) {
    this.nbase= {};

    this.addBase = function(){
        $http.post('//aleph.inesc-id.pt/vre/api/create/databases', this.nbase)
            .success(function () {
                //console.log('Successfuly posted new database');
                window.location = '#/databases';
            })
            .error(function () {
                console.log("Error: Could not insert");
            });
        this.nbase = {};
    };
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

    this.delBase = function(docid){
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
