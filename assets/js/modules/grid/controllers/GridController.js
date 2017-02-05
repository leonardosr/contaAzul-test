(function() {

    var grid = angular.module('contaAzul.modules.grid');

    grid.controller('gridController', ['$scope', '$carData', '$uibModal', '$filter', 'Flash', 'ConfirmationMessageService', gridController]);

    function gridController($scope, $carData, $uibModal, $filter, Flash, ConfirmationMessageService){

        $scope.pageSize = 5;

        $scope.carsArray = [];

        $scope.orderParam = 'placa';

        $scope.chkCars = {};

        $scope.allChecked = false;

        //Código para limpar o local storage
        //localStorage.removeItem("carData");

        if (typeof(Storage) !== "undefined") {
            
            if(localStorage.carData === undefined) {

                localStorage.setItem("carData", JSON.stringify($carData));
            }

            $scope.carsArray = JSON.parse(localStorage.carData);

        } else {
            $scope.carsArray = $carData;
        }

        function isAllChecked() {

            var allChecked = true;


            if($scope.filtered !== undefined)
                if($scope.filtered.length <= 0)
                    allChecked = false;

            angular.forEach($scope.filtered, function(car, i) {
                if(!$scope.chkCars[car.placa]) {
                    allChecked = false;
                    return false;
                }
            });

            return allChecked;

        }

        $scope.addCar = function () {

            modalAddEditCar("add", false)

        }

        $scope.editCar = function (placa) {

            modalAddEditCar("edit", placa)

        }

        function modalAddEditCar (action, editPlaca) {

            Flash.dismiss(0);

            var modalInstance = $uibModal.open({

                templateUrl: 'views/templates/cars/modalAddCar.html',
                controller: 'ModalAddCarInstanceCtrl',
                size: 'lg',
                animation: true,
                resolve: {
                    carsArrayObject: function () {
                        return $scope.carsArray;
                    },
                    action: function () {
                        return action;
                    },
                    editPlaca: function () {
                        return editPlaca;
                    }
                }

            }).result.then(function(result) {
                if(result) {

                    if (action == "edit") {
                        $scope.carsArray = $filter('filter')($scope.carsArray, {placa: '!' + editPlaca});
                    }

                    $scope.carsArray.push(result);

                    if (typeof(Storage) !== "undefined")
                        localStorage.setItem("carData", JSON.stringify($scope.carsArray));

                    var message = ((action == "add") ? 'O carro foi registrado com sucesso!' : 'O carro foi atualizado com sucesso!');
        
                    var id = Flash.create('success', message, 0, {class: 'flash-message-fixed'}, true);

                }
            });

        }

        $scope.rmvCar = function () {

            var confirmationMessage = ConfirmationMessageService.show('Atenção', 'Você deseja realmente excluir os veículos selecionados?');
                
            confirmationMessage.result.then(function (result) {
                if(result == 'confirm') {

                    var carsArrayCopy = angular.copy($scope.carsArray);

                    angular.forEach(carsArrayCopy, function(car, index) {
                        if($scope.chkCars[car.placa])
                            $scope.carsArray = $filter('filter')($scope.carsArray, {placa: '!' + car.placa})
                    });

                    if (typeof(Storage) !== "undefined")
                        localStorage.setItem("carData", JSON.stringify($scope.carsArray));

                    var message = 'Os carros foram removidos com sucesso!';

                    Flash.dismiss(0);
        
                    var id = Flash.create('success', message, 0, {class: 'flash-message-fixed'}, true);

                }

            });

        }

        $scope.sortCars = function (orderParam) {

            $scope.orderParam = ($scope.orderParam != orderParam) ? $scope.orderParam = orderParam : $scope.orderParam = '-' + orderParam;
        
        }

        $scope.toggleCheck = function () {

            $scope.allChecked = !$scope.allChecked;

            angular.forEach($scope.filtered, function(car) {
                $scope.chkCars[car.placa] = $scope.allChecked;
            });

        }

        $scope.$watch('filtered', function(newPage){
            $scope.allChecked = isAllChecked();
        });

        $scope.toggleCheckItem = function() {
            $scope.allChecked = isAllChecked();
        }

        $scope.filterFn = function(car) {

            if(!$scope.searchCar)
                return true;

            if(car.marca.includes($scope.searchCar)) {
                return true;
            }

            if(car.combustivel.includes($scope.searchCar)) {
                return true;
            }

            return false;

        };

    }

    function removeCarArrayNode(placa) {
        //$scope.carsArray = $filter('filter')($scope.carsArray, {placa: '!' + placa});
    }

})();