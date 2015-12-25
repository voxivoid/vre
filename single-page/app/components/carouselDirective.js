angular.module("carousel", []);

angular.module("carousel").directive("carousel", function(){
	return {
		restrict: "E",
		templateUrl: "app/components/carouselView.html"
	};
});

