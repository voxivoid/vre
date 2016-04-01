angular.module("news", ["ngRoute", "sidebar", "news-new"]);

angular.module("news").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/news", {templateUrl: "app/routes/news-view.html", controller: "NewsController"});
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

    this.delNew = function(docid){
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

angular.module("news").controller("NewsReviewController", ['$http', function($http){
    this.review = {};

    this.addReview = function(news){
        $http.put('//aleph.inesc-id.pt/vre/api/reviews/news/' + news, this.review)
            .success(function () {
                //console.log('Successfuly posted new review in news ' + news);
                location.reload();
            })
            .error(function () {
                console.log("Error: Could not insert");
            });
        this.review = {};
    };
}]);



angular.module("news-new", ["ngRoute"]);

angular.module("news-new").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/news/new", {templateUrl: "app/routes/news-create-view.html", controller: "NewsNewController"});
}]);

angular.module("news-new").controller("NewsNewController", ["$http", function($http) {
    this.nnews= {};

    this.addNews = function(){
        $http.post('//aleph.inesc-id.pt/vre/api/create/news', this.nnews)
            .success(function () {
                //console.log('Successfuly posted new news');
                window.location = '#/news';
            })
            .error(function () {
                console.log("Error: Could not insert");
            });
        this.nnews = {};
    };
}]);
