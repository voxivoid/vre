// My profile page controller
angular.module("profile", ["ngRoute"]);

angular.module("profile").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/profile", {templateUrl: "app/routes/profile-view.html", controller: "ProfileController"});
}]);

angular.module("profile").controller("ProfileController", ['$location','$scope', '$http', function($location,$scope,$http){

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/pt_PT/sdk.js#xfbml=1&version=v2.6";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    $scope.profileCtrl = this;

     this.user = [];

     $http.get('//aleph.inesc-id.pt/vre/api/userinfo')
     .success(function (data) {
         if(data.success) {
             $scope.profileCtrl.user = data.success.name;
             $scope.$broadcast('detailsReady', $scope.profileCtrl.user);
         }
     })
     .error(function () {
     console.log("Error: Could not get info");
     });

    /*

  $http.get("https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A121399476&start-date=30daysAgo&end-date=yesterday&metrics=ga%3Ausers&access_token=ya29.CjLZAgtJwrj0ipPSy-uR4lnDzY2YtZZWambL0I8XqQaCrVFfCX9da1ij_RVmZYyzxNyDRA").success(function(data){
            $scope.profileCtrl.users = parseInt(data.rows);
            $scope.$broadcast('usersReady', $scope.profileCtrl.users); // broadcasts when the profiles are loaded
    });*/



   }]);