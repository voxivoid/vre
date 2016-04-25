angular.module("news", ["ngRoute", "sidebar", "documents", "reviews"]);

angular.module("news").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/news", {templateUrl: "app/routes/news-view.html", controller: "NewsController"})
        .when("/news/self", {templateUrl: "app/routes/news-view.html", controller: "MyNewsController"})
        .when("/news/new", {templateUrl: "app/routes/news-create-view.html", controller: "NewNewsController"});
}]);

angular.module("news").controller("NewsController", ['$scope', '$http', function($scope, $http){
    $scope.newsCtrl = this;
    $scope.type = "news";

    this.news = [];
    $http.get('//aleph.inesc-id.pt/vre/api/' + $scope.type).success(function(data){
        if(data.success) {
            $scope.newsCtrl.news = data.success;
            $scope.$broadcast('newsReady', $scope.newsCtrl.news);
        }
    });

    $scope.$on('newsReady', function(event, news) {
        angular.forEach($scope.newsCtrl.news, function(newsObject, newsIndex){
            angular.forEach(newsObject.reviews, function(reviewObject, reviewIndex) {
                $http.get('//aleph.inesc-id.pt/vre/api/reviews/' + reviewObject).success(function(data){
                    if(data.success) {
                        //console.log('got news review ' + reviewObject);
                        $scope.newsCtrl.news[newsIndex].reviews[reviewIndex] = data.success;
                    }
                });
            })
        })
    });
}]);

angular.module("news").controller("MyNewsController", ['$scope', '$http', function($scope, $http){
    $scope.newsCtrl = this;
    $scope.type = "news";

    this.news = [];
    $http.get('//aleph.inesc-id.pt/vre/api/' + $scope.type + "?self=true").success(function(data){
        if(data.success) {
            $scope.newsCtrl.news = data.success;
            $scope.$broadcast('newsReady', $scope.newsCtrl.news);
        }
    });

    $scope.$on('newsReady', function(event, news) {
        angular.forEach($scope.newsCtrl.news, function(newsObject, newsIndex){
            angular.forEach(newsObject.reviews, function(reviewObject, reviewIndex) {
                $http.get('//aleph.inesc-id.pt/vre/api/reviews/' + reviewObject).success(function(data){
                    if(data.success) {
                        //console.log('got news review ' + reviewObject);
                        $scope.newsCtrl.news[newsIndex].reviews[reviewIndex] = data.success;
                    }
                });
            })
        })
    });
}]);

angular.module("news").controller("NewsNewsController", ["$scope", function($scope) {
    $scope.type = "news";
}]);

