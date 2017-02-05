(function() {

    var grid = angular.module('contaAzul.modules.grid');

    grid.controller('ModalAddCarInstanceCtrl', ['$scope', '$filter', '$uibModalInstance', 'carsArrayObject', 'action', 'editPlaca', ModalAddCarInstanceCtrl]);

    function ModalAddCarInstanceCtrl($scope, $filter, $uibModalInstance, carsArrayObject, action, editPlaca) {

        $scope.editCarData = {};

        $scope.placaReadonly = false;

        $scope.validateMsg = {
            placa       : "",
            modelo      : "",
            marca       : "",
            combustivel : "",               
            valor       : ""
        }

        if(action == "edit") {
            $scope.placaReadonly = true;
            $scope.actionTitle = "Editar";
            loadCarData();
        } else if (action == "add") {
            $scope.actionTitle = "Adicionar";
        }

        $scope.cancel = function () {
            $uibModalInstance.dismiss(false);
        };

        $scope.submitAddEditCar = function () {

            if(!validateForm())
                return false;

            var newCar = { 
                "combustivel" : $scope.combustivel,
                "imagem" : $scope.imagem,
                "marca" : $scope.marca,
                "modelo" : $scope.modelo,
                "placa" : $scope.placa,
                "valor" : $scope.valor
            };

            $uibModalInstance.close(newCar);

        }

        function loadCarData () {

            $scope.editCarData = $filter('filter')(carsArrayObject, {placa: editPlaca})[0];

            $scope.combustivel = $scope.editCarData.combustivel;
            $scope.imagem = $scope.editCarData.imagem;
            $scope.marca = $scope.editCarData.marca;
            $scope.modelo = $scope.editCarData.modelo;
            $scope.placa = $scope.editCarData.placa;
            $scope.valor = $scope.editCarData.valor;

        }

        function validateForm () {

            var isValid = true;

            var checkDupe;

            if(!$scope.placa) {
                $scope.validateMsg.placa = "obrigatório";
                isValid = false;
            } else {

                if(action == "new") {

                    checkDupe = $filter('filter')(carsArrayObject, {placa: $scope.placa});

                    if(checkDupe.length > 0) {
                        $scope.validateMsg.placa = "Já existe um carro cadastrado com esta placa";
                        isValid = false;
                    }

                }

            }

            if(!$scope.combustivel) {
                $scope.validateMsg.combustivel = "obrigatório";
                isValid = false;
            }

            if(!$scope.marca) {
                $scope.validateMsg.marca = "obrigatório";
                isValid = false;
            }

            if(!$scope.modelo) {
                $scope.validateMsg.modelo = "obrigatório";
                isValid = false;
            }

            if(!$scope.valor) {
                $scope.validateMsg.valor = "obrigatório";
                isValid = false;
            }

            return isValid;

        }

    }

})();