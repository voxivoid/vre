angular.module("databases", ["ngRoute", "bases", "sidebar"]);

angular.module("databases").config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/databases", {templateUrl: "app/routes/databases-view.html", controller: "DatabasesController"});
}]);

angular.module("databases").controller("ReviewController", function(){

    this.review = {};

    this.addReview = function(pbase){
      pbase.reviews.push(this.review);
      this.review = {};
    };

  });


angular.module("databases").controller("DatabasesController", ['$http', function($http){

	var databases = this;
	
	this.buttons = ["Add Database","My Databases","My Area", "My Profile"];
	
	databases.pubbases = [ ];

	$http.get('//aleph.inesc-id.pt/vre/api/databases').success(function(data){
		databases.pubbases = data;
		});

}]);
