// Documents controller
angular.module("documents", []);

angular.module("documents").controller("DocumentsController", ['$scope', '$http', function($scope, $http) {

    $scope.documentCtrl = this;

    this.doc= {};

    $http.get('//aleph.inesc-id.pt/vre/api/userinfo')
        .success(function (data) {
            if(data.success) {
                $scope.documentCtrl.doc.author = data.success.email;
                $scope.$broadcast('emailReady', $scope.documentCtrl.doc.author);
            }
        })
        .error(function () {
            console.log("Error: Could not get info");
        });

    this.addDoc = function(){ // adds document depending on the actual context

        this.doc.author = $scope.documentCtrl.doc.author;

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
        var r = confirm("This will remove the document permanently.");
        if (r == true) {
            $http.delete('//aleph.inesc-id.pt/vre/api/delete/' + $scope.type + '/' + docid)
            .success(function () {
                location.reload();
            })
            .error(function () {
                console.log("Error: Could not remove document");
            });
        }
    };
}]);
