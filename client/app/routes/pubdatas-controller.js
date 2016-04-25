angular.module("pubdatas", ["ngRoute", "sidebar", "documents", "reviews"]);

angular.module("pubdatas").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/publicdata", {templateUrl: "app/routes/pubdatas-view.html", controller: "PubdatasController"})
        .when("/publicdata/self", {templateUrl: "app/routes/pubdatas-view.html", controller: "MyPubdatasController"})
        .when("/publicdata/new", {templateUrl: "app/routes/pubdatas-create-view.html", controller: "NewPubdatasController"});
}]);

angular.module("pubdatas").controller("PubdatasController", ['$scope', '$http', function($scope, $http){
    $scope.pubdatasCtrl = this;
    $scope.type = "pubdatas";

    this.pubdatas = [];
    $http.get('//aleph.inesc-id.pt/vre/api/' + $scope.type).success(function(data){
        if(data.success) {
            $scope.pubdatasCtrl.pubdatas = data.success;
            $scope.$broadcast('pubdatasReady', $scope.pubdatasCtrl.pubdatas);
        }
    });

    $scope.$on('pubdatasReady', function(event, pubdatas) {
        angular.forEach($scope.pubdatasCtrl.pubdatas, function(pubdataObject, pubdataIndex){
            angular.forEach(pubdataObject.reviews, function(reviewObject, reviewIndex) {
                $http.get('//aleph.inesc-id.pt/vre/api/reviews/' + reviewObject).success(function(data){
                    if(data.success) {
                        //console.log('got pubdata review ' + reviewObject);
                        $scope.pubdatasCtrl.pubdatas[pubdataIndex].reviews[reviewIndex] = data.success;
                    }
                });
            })
        })
    });
}]);

angular.module("pubdatas").controller("MyPubdatasController", ['$scope', '$http', function($scope, $http){
    $scope.pubdatasCtrl = this;
    $scope.type = "pubdatas";

    this.pubdatas = [];
    $http.get('//aleph.inesc-id.pt/vre/api/' + $scope.type + "?self=true").success(function(data){
        if(data.success) {
            $scope.pubdatasCtrl.pubdatas = data.success;
            $scope.$broadcast('pubdatasReady', $scope.pubdatasCtrl.pubdatas);
        }
    });


    $scope.$on('pubdatasReady', function(event, pubdatas) {
        angular.forEach($scope.pubdatasCtrl.pubdatas, function(pubdataObject, pubdataIndex){
            angular.forEach(pubdataObject.reviews, function(reviewObject, reviewIndex) {
                $http.get('//aleph.inesc-id.pt/vre/api/reviews/' + reviewObject).success(function(data){
                    if(data.success) {
                        //console.log('got pubdata review ' + reviewObject);
                        $scope.pubdatasCtrl.pubdatas[pubdataIndex].reviews[reviewIndex] = data.success;
                    }
                });
            })
        })
    });
}]);

angular.module("pubdatas").controller("NewPubdatasController", ["$scope", function($scope) {
    $scope.type = "pubdatas";
}]);
