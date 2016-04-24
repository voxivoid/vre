angular.module("pubdatas", ["ngRoute", "sidebar", "pubdata-new"]);

angular.module("pubdatas").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/publicdata", {templateUrl: "app/routes/pubdatas-view.html", controller: "PubdatasController"})
        .when("/publicdata/self", {templateUrl: "app/routes/pubdatas-view.html", controller: "MyPubdatasController"});
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

    this.delRev = function(revid, docid){
        $http.delete('//aleph.inesc-id.pt/vre/api/reviews/' + $scope.type + '/' + docid + '/' + revid)
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

    this.delPub = function(docid){
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

angular.module("pubdatas").controller("PublicdataReviewController", ['$http', function($http){
    this.review = {};

    this.addReview = function(pubdata){
        $http.put('//aleph.inesc-id.pt/vre/api/reviews/pubdatas/' + pubdata, this.review)
            .success(function () {
                //console.log('Successfuly posted new review in pubdata ' + pubdata);
                location.reload();
            })
            .error(function () {
                console.log("Error: Could not insert");
            });
        this.review = {};
    };
}]);



angular.module("pubdata-new", ["ngRoute"]);

angular.module("pubdata-new").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/publicdata/new", {templateUrl: "app/routes/pubdatas-create-view.html", controller: "PubdataNewController"});
}]);

angular.module("pubdata-new").controller("PubdataNewController", ["$http", function($http) {
    this.npub= {};

    this.addPub = function(){
        $http.post('//aleph.inesc-id.pt/vre/api/create/pubdatas', this.npub)
            .success(function () {
                //console.log('Successfuly posted new pubdata');
                window.location = '#/publicdata';
            })
            .error(function () {
                console.log("Error: Could not insert");
            });
        this.npub = {};
    };
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

    this.delRev = function(revid, docid){
        $http.delete('//aleph.inesc-id.pt/vre/api/reviews/' + $scope.type + '/' + docid + '/' + revid)
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

    this.delPub = function(docid){
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
