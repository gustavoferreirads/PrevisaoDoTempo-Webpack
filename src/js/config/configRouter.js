export default $routeProvider => { //Usando ng-Router dentro de um serviço ou controller se quiser redirecionar basta injetar e fazer $location.path('/previsaodoTempo')
    $routeProvider.when('/previsaodoTempo', { //para usar parametros basta usar /previsaodoTempo/:parametro para recuperar no controller basta injetar $routParams.parametro
        templateUrl: './src/view/search.html',
        controller: 'previsaoController as previsaoCtrl',
        resolve: { // Resolve dependencias que sejam necessárias para acessar qualquer confionalidade
            // atributo : function(recursoInjetaod,$route para poder pegar o parametro da url se quiser){ return algumaCoisa } Esse atributo sera utilizado pelo controller posteriormente esse atributo pode ser injetado no controller/serviço
        }
    });
    $routeProvider.otherwise('/', {
        redirectTo: '/previsaodoTempo'
    });

    $routeProvider.when("/error", {
        templateUrl: "view/error.html"
    });
}
