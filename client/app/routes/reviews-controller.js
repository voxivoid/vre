angular.module("reviews", []);

angular.module("reviews").controller("ReviewsController", ['$scope', '$http', function($scope, $http) {

        this.review = {};

        this.addReview = function(docid){
            $http.put('//aleph.inesc-id.pt/vre/api/reviews/' + $scope.type + "/" + docid, this.review)
                .success(function () {
                    //console.log('Successfuly posted new review in database ' + database);
                    location.reload();
                })
                .error(function () {
                    console.log("Error: Could not insert");
                });
            this.review = {};
        };

        this.delRev = function (revid, docid) {
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
    }]
);
