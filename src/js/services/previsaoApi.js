export default function($http, config) {
    'ngInject';
    const _carregaPrevisoes = (cidade) => {
        return $http.get(config.baseUrl + cidade);
    };

    return {
        carregaPrevisoes: _carregaPrevisoes
    };
};
