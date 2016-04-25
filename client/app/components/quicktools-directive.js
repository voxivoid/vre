// This directive presents the section quick tools in the home page
angular.module("quicktools", []);

angular.module("quicktools").directive("quicktools", function(){
	return {
		restrict: "E",
		templateUrl: "app/components/quicktools-view.html"
	};
});

