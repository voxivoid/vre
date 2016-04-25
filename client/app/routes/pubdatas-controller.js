angular.module("pubdatas", ["ngRoute", "sidebar", "documents", "reviews"]);

angular.module("pubdatas").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/publicdata", {templateUrl: "app/routes/pubdatas-view.html", controller: "PubdatasController"})
        .when("/publicdata/self", {templateUrl: "app/routes/pubdatas-view.html", controller: "PubdatasController"})
        .when("/publicdata/new", {templateUrl: "app/routes/pubdatas-create-view.html", controller: "NewPubdatasController"});
}]);

angular.module("pubdatas").controller("PubdatasController", ['$location', '$scope', '$http', function($location, $scope, $http){
    $scope.pubdatasCtrl = this;
    $scope.type = "pubdatas";

    var getUrl;
    if($location.path() === "/publicdata/self"){
        getUrl = '//aleph.inesc-id.pt/vre/api/' + $scope.type + "?self=true";
    } else{
        getUrl = '//aleph.inesc-id.pt/vre/api/' + $scope.type;
    }

    this.pubdatas = [];
    $http.get(getUrl).success(function(data){
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
