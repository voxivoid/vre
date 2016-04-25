// Public data pages module and controllers
angular.module("pubdatas", ["ngRoute", "sidebar", "documents", "reviews"]);

angular.module("pubdatas").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/publicdata", {templateUrl: "app/routes/pubdatas-view.html", controller: "PubdatasController"})
        .when("/publicdata/self", {templateUrl: "app/routes/pubdatas-view.html", controller: "PubdatasController"})
        .when("/publicdata/new", {templateUrl: "app/routes/pubdatas-create-view.html", controller: "NewPubdatasController"});
}]);

angular.module("pubdatas").controller("PubdatasController", ['$location', '$scope', '$http', function($location, $scope, $http){
    $scope.pubdatasCtrl = this;
    $scope.type = "pubdatas"; // used to know the actual context

    var getUrl;
    if($location.path() === "/publicdata/self"){
        getUrl = '//aleph.inesc-id.pt/vre/api/' + $scope.type + "?self=true"; // requests only own public data
    } else{
        getUrl = '//aleph.inesc-id.pt/vre/api/' + $scope.type; // requests all public data
    }

    this.pubdatas = [];
    $http.get(getUrl).success(function(data){
        if(data.success) {
            $scope.pubdatasCtrl.pubdatas = data.success;
            $scope.$broadcast('pubdatasReady', $scope.pubdatasCtrl.pubdatas); // broadcasts when the public data is loaded
        }
    });

    $scope.$on('pubdatasReady', function(event, pubdatas) {
        angular.forEach($scope.pubdatasCtrl.pubdatas, function(pubdataObject, pubdataIndex){
            angular.forEach(pubdataObject.reviews, function(reviewObject, reviewIndex) {
                $http.get('//aleph.inesc-id.pt/vre/api/reviews/' + reviewObject).success(function(data){ // requests reviews for each public data
                    if(data.success) {
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
