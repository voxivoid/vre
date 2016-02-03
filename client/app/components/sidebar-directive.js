angular.module("sidebar", []);

angular.module("sidebar").directive("sidebar", function(){
    return {
        restrict: "E",
        templateUrl: "app/components/sidebar-view.html"
    };
});

angular.module("pipelines").controller("SidebarController", function($scope){
    if($scope.type === "workflows") {
        this.buttons = ["Add Workflow", "My Workflows", "My Area", "My Profile"];
        this.links = ["#/workflow/new", "#", "#", "#"];
        this.index = []
        $scope.workflowsCtrl.pubflows.forEach(function() {
                index.push(i.name)
            }
        );
    }
    else if ($scope.type === "databases"){
        this.buttons = ["Add Database","My Databases","My Area", "My Profile"];
        this.links = ["#/database/new","#","#","#"];
        this.index = []
        $scope.databasesCtrl.pubbases.forEach(function() {
                index.push(i.acronym)
            }
        );
    }
});
