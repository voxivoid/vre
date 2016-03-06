angular.module("databases", ["ngRoute", "sidebar", "database-new"]);

angular.module("databases").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/databases", {templateUrl: "app/routes/databases-view.html", controller: "DatabasesController"});
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

    this.delRev = function(revid, docid){
        $http.put('//aleph.inesc-id.pt/vre/api/reviews/' + $scope.type + '/' + docid + '/' + revid)
            .success(function () {
                //console.log('Successfuly removed review with id ' + revid + ' from ' + $scope.type + ' with id ' + docid);
                $http.delete('//aleph.inesc-id.pt/vre/api/delete/reviews/' + revid)
                    .success(function () {
                        //console.log('Successfuly removed review from reviews');
                        location.reload();
                    })
                    .error(function () {
                        console.log("Error: Could not remove review from reviews");
                    });
            })
            .error(function () {
                console.log("Error: Could not remove review from document");
            });
    };

}]);

angular.module("databases").controller("DataReviewController", ['$http', function($http){
    this.review = {};

    this.addReview = function(database){
        $http.put('//aleph.inesc-id.pt/vre/api/reviews/databases/' + database, this.review)
            .success(function () {
                //console.log('Successfuly posted new review in database ' + database);
                location.reload();
            })
            .error(function () {
                console.log("Error: Could not insert");
            });
        this.review = {};
    };
}]);



angular.module("database-new", ["ngRoute"]);

angular.module("database-new").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/database/new", {templateUrl: "app/routes/database-create-view.html", controller: "DatabaseNewController"});
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
