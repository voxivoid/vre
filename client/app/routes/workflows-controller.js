angular.module("workflows", ["ngRoute", "sidebar", "workflow-new", "workflow-detail"]);

angular.module("workflows").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/workflows", {templateUrl: "app/routes/workflows-view.html", controller: "WorkflowsController"});
}]);

angular.module("workflows").controller("WorkflowsController", ['$scope', '$http', function($scope, $http){
    $scope.workflowsCtrl = this;
    $scope.type = "workflows";

    this.workflows = [];
    $http.get('//aleph.inesc-id.pt/vre/api/' + $scope.type).success(function(data){
        if(data.success) {
            $scope.workflowsCtrl.workflows = data.success;
            $scope.$broadcast('workflowsReady', $scope.workflowsCtrl.workflows);
        }
    });


    $scope.$on('workflowsReady', function(event, workflows) {
        angular.forEach($scope.workflowsCtrl.workflows, function(workflowObject, workflowIndex){
            angular.forEach(workflowObject.reviews, function(reviewObject, reviewIndex) {
                $http.get('//aleph.inesc-id.pt/vre/api/reviews/' + reviewObject).success(function(data){
                    if(data.success) {
                        //console.log('got review' + reviewObject);
                        $scope.workflowsCtrl.workflows[workflowIndex].reviews[reviewIndex] = data.success;
                    }
                });
            })
        })
    });

    this.delRev = function(revid, docid){
        //console.log("Trying to remove review");
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

    this.delFlow = function(docid){
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

angular.module("workflows").controller("WorkReviewController", ['$http', function($http){
    this.review = {};

    this.addReview = function(workflow){
        $http.put('//aleph.inesc-id.pt/vre/api/reviews/workflows/' + workflow, this.review)
            .success(function () {
                //console.log('Successfuly posted new review in workflow ' + workflow);
                location.reload();
            })
            .error(function () {
                console.log("Error: Could not insert");
            });
        this.review = {};
    };
}]);



angular.module("workflow-new", ["ngRoute"]);

angular.module("workflow-new").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/workflow/new", {templateUrl: "app/routes/workflow-create-view.html", controller: "WorkflowNewController"});
}]);

angular.module("workflow-new").controller("WorkflowNewController", ["$http", function($http) {
    this.nflow = {};

    this.addFlow = function(){
        $http.post('//aleph.inesc-id.pt/vre/api/create/workflows', this.nflow)
            .success(function (data) {
                //console.log('Successfuly posted new workflow');
                window.location = '#/workflows';
            })
            .error(function () {
                console.log("Error: Could not insert");
            });
        this.nflow = {};
    };
}]);

angular.module("workflow-detail", ["ngRoute"]);

angular.module("workflow-detail").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/workflow/detail/:id", {
            templateUrl: "app/routes/workflow-detail-view.html",
            controller: "WorkflowDetailController"
        });
}]);

angular.module("workflow-detail").controller("WorkflowDetailController", ["$scope", "$routeParams" ,"$http", function($scope, $routeParams ,$http) {
    $scope.detailCtrl = this;
    $scope.type = "detail";

    this.detail = {};

    $http.get('//aleph.inesc-id.pt/vre/api/workflows/' + $routeParams.id)
        .success(function (data) {
            if(data.success) {
                //what to put here?
                $scope.detailCtrl.detail = data.success;
                $scope.$broadcast('detailsReady', $scope.detailsCtrl.detail);
            }
        })
        .error(function () {
            console.log("Error: Could not insert");
        });

}]);
