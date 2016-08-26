module.exports = function($http, config) {
    'ngInject';
    var _carregaPrevisoes = function(cidade) {
        return $http.get(config.baseUrl + cidade);
    };

    return {
        carregaPrevisoes: _carregaPrevisoes
    };
};
