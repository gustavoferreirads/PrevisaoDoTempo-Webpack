import templateSearch from '../../view/search.html';

export default ($stateProvider, $urlRouterProvider) => {
   'ngInject';
    $stateProvider.state('previsaoDoTempo', {
        url: '/:nomeCidade',
        template: templateSearch,
        controller: 'previsaoController',
        controllerAs: 'previsaoCtrl'
    });
    $urlRouterProvider.otherwise('/');
}
