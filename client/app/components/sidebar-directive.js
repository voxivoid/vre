angular.module("sidebar", []);

angular.module("sidebar").directive("sidebar", function(){
    return {
        restrict: "E",
        templateUrl: "app/components/sidebar-view.html"
    };
});

angular.module("sidebar").controller("SidebarController", function($scope){
    $scope.sidebarCtrl = this;
    this.type = $scope.type;

    if(this.type === "workflows") {
        this.buttons = ["Add Workflow", "My Workflows", "My Area", "My Profile"];
        this.links = ["#/workflow/new", "#", "#", "#"];
        this.index = []
        $scope.$on('workflowsReady', function(event, workflows) {
            for (i = 0; i < workflows.length; i++) {
                $scope.sidebarCtrl.index.push(workflows[i].name);
            }
        });
    }
    else if (this.type === "databases"){
        this.buttons = ["Add Database","My Databases","My Area", "My Profile"];
        this.links = ["#/database/new","#","#","#"];
        this.index = []

        $scope.$on('databasesReady', function(event, databases) {
            for (i = 0; i < databases.length; i++) {
                $scope.sidebarCtrl.index.push(databases[i].acronym);
            }
        });
    }
});
