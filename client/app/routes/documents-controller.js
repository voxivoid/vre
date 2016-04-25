angular.module("documents", []);

angular.module("documents").controller("DocumentsController", ['$scope', '$http', function($scope, $http) {
    this.doc= {};

    this.addDoc = function(){
        $http.post('//aleph.inesc-id.pt/vre/api/create/' + $scope.type + '/', this.doc)
            .success(function () {
                //console.log('Successfuly posted new pubdata');
                window.history.back();
            })
            .error(function () {
                console.log("Error: Could not insert");
            });
        this.doc = {};
    };

    this.delDoc = function(docid){
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
