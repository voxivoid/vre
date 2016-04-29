// Protocols pages module and controllers
angular.module("protocols", ["ngRoute", "sidebar", "documents", "reviews"]);

angular.module("protocols").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/protocols", {templateUrl: "app/routes/protocols-view.html", controller: "ProtocolsController"})
        .when("/protocols/self", {templateUrl: "app/routes/protocols-view.html", controller: "ProtocolsController"})
        .when("/protocols/new", {templateUrl: "app/routes/protocol-create-view.html", controller: "NewProtocolController"});
}]);

angular.module("protocols").controller("ProtocolsController", ['$location', '$scope', '$http', function($location, $scope, $http){
    $scope.protocolsCtrl = this;
    $scope.type = "protocols"; // used to know the actual context

    var getUrl;
    if($location.path() === "/protocols/self"){
        getUrl = '//aleph.inesc-id.pt/vre/api/' + $scope.type + "?self=true"; // requests only own protocols
    } else{
        getUrl = '//aleph.inesc-id.pt/vre/api/' + $scope.type; // requests all protocols
    }

    this.protocols = [];
    $http.get(getUrl).success(function(data){
        if(data.success) {
            $scope.protocolsCtrl.protocols = data.success;
            $scope.$broadcast('protocolsReady', $scope.protocolsCtrl.protocols); // broadcasts when the protocols are loaded
        }
    });

    $scope.$on('protocolsReady', function(event, protocols) {
        angular.forEach($scope.protocolsCtrl.protocols, function(protocolObject, protocolIndex){
            angular.forEach(protocolObject.reviews, function(reviewObject, reviewIndex) {
                $http.get('//aleph.inesc-id.pt/vre/api/reviews/' + reviewObject).success(function(data){ // requests reviews for each protocol
                    if(data.success) {
                        $scope.protocolsCtrl.protocols[protocolIndex].reviews[reviewIndex] = data.success;
                    }
                });
            })
        })
    });
}]);

angular.module("protocols").controller("NewProtocolController", ["$scope", function($scope) {
    $scope.type = "protocols";
}]);
