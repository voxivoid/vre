// News pages module and controllers
angular.module("news", ["ngRoute", "sidebar", "documents", "reviews"]);

angular.module("news").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/news", {templateUrl: "app/routes/news-view.html", controller: "NewsController"})
        .when("/news/self", {templateUrl: "app/routes/news-view.html", controller: "NewsController"})
        .when("/news/new", {templateUrl: "app/routes/news-create-view.html", controller: "NewNewsController"});
}]);

angular.module("news").controller("NewsController", ['$location', '$scope', '$http', function($location, $scope, $http){
    $scope.newsCtrl = this;
    $scope.type = "news"; // used to know the actual context

    var getUrl;
    if($location.path() === "/news/self"){
        getUrl = '//aleph.inesc-id.pt/vre/api/' + $scope.type + "?self=true"; // requests only own news
    } else{
        getUrl = '//aleph.inesc-id.pt/vre/api/' + $scope.type; // requests all news
    }

    this.news = [];
    $http.get(getUrl).success(function(data){
        if(data.success) {
            $scope.newsCtrl.news = data.success;
            $scope.$broadcast('newsReady', $scope.newsCtrl.news); // broadcasts when the news are loaded
        }
    });

    $scope.$on('newsReady', function(event, news) {
        angular.forEach($scope.newsCtrl.news, function(newsObject, newsIndex){
            angular.forEach(newsObject.reviews, function(reviewObject, reviewIndex) {
                $http.get('//aleph.inesc-id.pt/vre/api/reviews/' + reviewObject).success(function(data){ // requests reviews for each news
                    if(data.success) {
                        $scope.newsCtrl.news[newsIndex].reviews[reviewIndex] = data.success;
                    }
                });
            })
        })
    });
}]);

angular.module("news").controller("NewNewsController", ["$scope", function($scope) {
    $scope.type = "news";
}]);

