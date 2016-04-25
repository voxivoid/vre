// My profile page controller
angular.module("profile", ["ngRoute"]);

angular.module("profile").config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/profile", {templateUrl: "app/routes/profile-view.html", controller: "ProfileController"});
}]);

angular.module("profile").controller("ProfileController", [function(){
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/pt_PT/sdk.js#xfbml=1&version=v2.6";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}]);