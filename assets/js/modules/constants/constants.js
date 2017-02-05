(function() {

	var constants = angular.module('contaAzul.modules.constants', []);

	constants.constant("$carData", [ 
        { "combustivel" : "Flex",
            "imagem" : null,
            "marca" : "Volkswagem",
            "modelo" : "Gol",
            "placa" : "FFF5498",
            "valor" : "20000"
        },
        { 
            "combustivel" : "Gasolina",
            "imagem" : null,
            "marca" : "Volkswagem","modelo" : "Fox",
            "placa" : "FOX4125",
            "valor" : "20000"
        },
        { 
            "combustivel" : "Alcool",
            "imagem" : "http://carros.ig.com.br/fotos/2010/290_193/Fusca2_290_193.jpg",
            "marca" : "Volkswagen",
            "modelo" : "Fusca",
            "placa" : "PAI4121",
            "valor" : "20000"
        }
    ]);

})();