(function() {

	var header = angular.module('contaAzul.modules.header');

	header.directive('headerPartial', headerPartial);

	function headerPartial() {

		return {
			restrict: 'E',
			templateUrl: 'views/partials/headerPartial.html' 
		};

	}

})();