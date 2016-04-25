// Workflows pages module and controllers
angular.module("workflows", ["ngRoute", "sidebar", "workflow-detail", "documents", "reviews"]);

angular.module("workflows").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/workflows", {templateUrl: "app/routes/workflows-view.html", controller: "WorkflowsController"})
        .when("/workflows/self", {templateUrl: "app/routes/workflows-view.html", controller: "WorkflowsController"})
        .when("/workflows/new", {templateUrl: "app/routes/workflows-create-view.html", controller: "NewWorkflowsController"});
}]);

angular.module("workflows").controller("WorkflowsController", ['$location', '$scope', '$http', function($location, $scope, $http){
    $scope.workflowsCtrl = this;
    $scope.type = "workflows"; // used to know the actual context

    var getUrl;
    if($location.path() === "/workflows/self"){
        getUrl = '//aleph.inesc-id.pt/vre/api/' + $scope.type + "?self=true"; // requests only own workflows
    } else{
        getUrl = '//aleph.inesc-id.pt/vre/api/' + $scope.type; // requests all workflows
    }

    this.workflows = [];
    $http.get(getUrl).success(function(data){
        if(data.success) {
            $scope.workflowsCtrl.workflows = data.success;
            $scope.$broadcast('workflowsReady', $scope.workflowsCtrl.workflows); // broadcasts when the workflows are loaded
        }
    });

    $scope.$on('workflowsReady', function(event, workflows) {
        angular.forEach($scope.workflowsCtrl.workflows, function(workflowObject, workflowIndex){
            angular.forEach(workflowObject.reviews, function(reviewObject, reviewIndex) {
                $http.get('//aleph.inesc-id.pt/vre/api/reviews/' + reviewObject).success(function(data){ // requests reviews for each workflow
                    if(data.success) {
                        //console.log('got review' + reviewObject);
                        $scope.workflowsCtrl.workflows[workflowIndex].reviews[reviewIndex] = data.success;
                    }
                });
            })
        })
    });
}]);

angular.module("workflows").controller("NewWorkflowsController", ["$scope", function($scope) {
    $scope.type = "workflows";
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
