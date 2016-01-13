angular.module("quicktools", []);

angular.module("quicktools").directive("quicktools", function(){
	return {
		restrict: "E",
		templateUrl: "app/components/quicktools-view.html"
	};
});

