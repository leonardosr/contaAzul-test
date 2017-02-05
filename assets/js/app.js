(function() {

    var app = angular.module('testeContaAzul', [
        'ui.bootstrap',
        'ui.mask',
        'ngFlash',
        'ui.utils.masks',
        'contaAzul.modules.header',
        'contaAzul.modules.grid',
        'contaAzul.modules.constants',
        'contaAzul.modules.services'
    ]);

    app.controller('mainController', ['$scope', '$carData', mainController]);

    function mainController($scope){

    }

    app.controller('modalConfirmationMessageController', ['$scope', '$uibModalInstance', 'message', 'description', modalConfirmationMessageController]);

    function modalConfirmationMessageController ($scope, $uibModalInstance, message, description) {

        $scope.messageText = message;
        $scope.descriptionText = description;

        $scope.confirm = function () {
            $uibModalInstance.close('confirm');
        };

        $scope.cancel = function () {
            $uibModalInstance.close('cancel');
        };

    }

    app.config(['$qProvider', function ($qProvider) {
	    $qProvider.errorOnUnhandledRejections(false);
	}]);

    app.config(['FlashProvider', function (FlashProvider) {
        FlashProvider.setTimeout(5000);
        FlashProvider.setShowClose(true);
    }]);

})();