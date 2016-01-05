angular.module("databases", ["ngRoute", "bases", "sidebar"]);

angular.module("databases").config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/databases", {templateUrl: "app/routes/databasesView.html", controller: "DatabasesController"});
}]);

angular.module("databases").controller("DatabasesController", ['$http', function($http){

	var databases = this;
	
	this.buttons = ["Add Database","My Databases","My Area", "My Profile"];
	
	databases.pubbases = [ ];

	$http.get('app/json/pubbases.json').success(function(data){
		databases.pubbases = data;
		});

}]);
