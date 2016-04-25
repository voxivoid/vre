// Documents controller
angular.module("documents", []);

angular.module("documents").controller("DocumentsController", ['$scope', '$http', function($scope, $http) {
    this.doc= {};

    this.addDoc = function(){ // adds document depending on the actual context
        $http.post('//aleph.inesc-id.pt/vre/api/create/' + $scope.type + '/', this.doc)
            .success(function () {
                window.history.back();
            })
            .error(function () {
                console.log("Error: Could not insert");
            });
        this.doc = {};
    };

    this.delDoc = function(docid){ // deletes document depending on the actual context
        $http.delete('//aleph.inesc-id.pt/vre/api/delete/' + $scope.type + '/' + docid)
            .success(function () {
                location.reload();
            })
            .error(function () {
                console.log("Error: Could not remove document");
            });
    };
}]);
