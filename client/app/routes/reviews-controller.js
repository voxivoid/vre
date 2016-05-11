// Reviews controller
angular.module("reviews", []);

angular.module("reviews").controller("ReviewsController", ['$scope', '$http', function($scope, $http) {

    $scope.reviewsCtrl = this;

    this.review = {};

    $http.get('//aleph.inesc-id.pt/vre/api/userinfo')
        .success(function (data) {
            if(data.success) {
                $scope.reviewsCtrl.review.author = data.success.email;
                $scope.$broadcast('emailReady', $scope.reviewsCtrl.review.author);
            }
        })
        .error(function () {
            console.log("Error: Could not get info");
        });

        this.addReview = function(docid){ // adds review to the document depending on the actual context

            this.review.author = $scope.reviewsCtrl.review.author;

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
            var r = confirm("This will remove the review permanently.");
            if (r == true) {
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
            }
        };
    }]
);
