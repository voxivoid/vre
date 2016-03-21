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
    else if (this.type === "news"){
        this.buttons = ["Add News","My News","My Area", "My Profile"];
        this.links = ["#/news/new","#","#","#"];
        this.index = []

        $scope.$on('newsReady', function(event, news) {
            for (i = 0; i < news.length; i++) {
                $scope.sidebarCtrl.index.push(news[i].name);
            }
        });
    }
    else if (this.type === "tools"){
        this.buttons = ["Add Tool","My Tools","My Area", "My Profile"];
        this.links = ["#/tool/new","#","#","#"];
        this.index = []

        $scope.$on('toolsReady', function(event, tools) {
            for (i = 0; i < tools.length; i++) {
                $scope.sidebarCtrl.index.push(tools[i].acronym);
            }
        });
    }else if (this.type === "pubdatas"){
        this.buttons = ["Add Public Resource","My Public Resources","My Area", "My Profile"];
        this.links = ["#/publicdata/new","#","#","#"];
        this.index = []

        $scope.$on('pubdatasReady', function(event, pubdatas) {
            for (i = 0; i < pubdatas.length; i++) {
                $scope.sidebarCtrl.index.push(pubdatas[i].name);
            }
        });
    }});
