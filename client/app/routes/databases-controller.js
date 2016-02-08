angular.module("databases", ["ngRoute", "sidebar", "database-new"]);

angular.module("databases").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/databases", {templateUrl: "app/routes/databases-view.html", controller: "DatabasesController"});
}]);

/*
angular.module("databases").controller("ReviewController", function(){
    this.review = {};
    this.addReview = function(pbase){
        pbase.reviews.push(this.review);
        this.review = {};
    };
});
*/


angular.module("databases").controller("DatabasesController", ['$scope', '$http', function($scope, $http){
    $scope.databasesCtrl = this;
    $scope.type = "databases";

    this.databases = [];
    $http.get('//aleph.inesc-id.pt/vre/api/databases').success(function(data){
        if(data.success) {
            $scope.databasesCtrl.databases = data.success;
            $scope.$broadcast('databasesReady', $scope.databasesCtrl.databases);
        }
    });

}]);

angular.module("database-new", ["ngRoute", "adddatabase", "sidebar"]);

angular.module("database-new").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/database/new", {templateUrl: "app/routes/database-create-view.html", controller: "DatabaseNewController"});
}]);

angular.module("database-new").controller("DatabaseNewController", ["$http", function($http) {
    this.nbase = {};
    this.addBase = function(){
        $http.post('//aleph.inesc-id.pt/vre/api/databases', this.nbase)
            .success(function () {
                console.log('Successfuly posted new database');
                window.location = '#/databases';
            })
            .error(function () {
                console.log("Error: Could not insert");
            });
        this.nbase = {};
    };
}]);
