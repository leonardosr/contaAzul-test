(function() {

    var services = angular.module('contaAzul.modules.services', []);

    services.service('ConfirmationMessageService', ['$uibModal', ConfirmationMessageService]);

    function ConfirmationMessageService ($uibModal) {

        this.show = function (paramMessageText, paramDescription) {

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/templates/modalConfirmationMessage.html',
                controller: 'modalConfirmationMessageController',
                size: 'sm',               
                windowClass: 'modal-alert confirmation',
                animation: true,
                backdrop: 'static',
                resolve: {
                    message: function () { return paramMessageText; },
                    description: function () { return paramDescription; }
                }

            });

            return modalInstance;

        }

    }

})();