// Databases pages module and controllers
angular.module("databases", ["ngRoute", "sidebar", "documents", "reviews"]);

angular.module("databases").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/databases", {templateUrl: "app/routes/databases-view.html", controller: "DatabasesController"})
        .when("/databases/self", {templateUrl: "app/routes/databases-view.html", controller: "DatabasesController"})
        .when("/databases/new", {templateUrl: "app/routes/database-create-view.html", controller: "NewDatabaseController"});
}]);

angular.module("databases").controller("DatabasesController", ['$location', '$scope', '$http', function($location, $scope, $http){
    $scope.databasesCtrl = this;
    $scope.type = "databases"; // used to know the actual context

    var getUrl;
    if($location.path() === "/databases/self"){
        getUrl = '//aleph.inesc-id.pt/vre/api/' + $scope.type + "?self=true"; // requests only own databases
    } else{
        getUrl = '//aleph.inesc-id.pt/vre/api/' + $scope.type; // requests all databases
    }

    this.databases = [];
    $http.get(getUrl).success(function(data){
        if(data.success) {
            $scope.databasesCtrl.databases = data.success;
            $scope.$broadcast('databasesReady', $scope.databasesCtrl.databases); // broadcasts when the databases are loaded
        }
    });

    $scope.$on('databasesReady', function(event, databases) {
        angular.forEach($scope.databasesCtrl.databases, function(databaseObject, databaseIndex){
            angular.forEach(databaseObject.reviews, function(reviewObject, reviewIndex) {
                $http.get('//aleph.inesc-id.pt/vre/api/reviews/' + reviewObject).success(function(data){ // requests reviews for each database
                    if(data.success) {
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
