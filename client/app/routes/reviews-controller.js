// Reviews controller
angular.module("reviews", []);

angular.module("reviews").controller("ReviewsController", ['$scope', '$http', function($scope, $http) {

        this.review = {};

        this.addReview = function(docid){ // adds review to the document depending on the actual context
            $http.put('//aleph.inesc-id.pt/vre/api/reviews/' + $scope.type + "/" + docid, this.review)
                .success(function () {
                    location.reload();
                })
                .error(function () {
                    console.log("Error: Could not insert");
                });
            this.review = {};
        };

        this.delRev = function (revid, docid) { // deletes review to the document depending on the actual context
            $http.delete('//aleph.inesc-id.pt/vre/api/reviews/' + $scope.type + '/' + docid + '/' + revid)
                .success(function () {
                    $http.delete('//aleph.inesc-id.pt/vre/api/delete/reviews/' + revid)
                        .success(function () {
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
