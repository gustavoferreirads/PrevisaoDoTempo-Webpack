describe('PrevisaoController', function() {
    var ctrl;
    var dados = {
        temperatura: 22,
        temperaturaMinima: 19,
        temperaturaMaxima: 30,
        pressao: 1000,
        descricao: 'nublado'
    };

    beforeEach(function() {
        module('previsaoDoTempo');
    });

    beforeEach(function() {
        inject(function($controller, previsaoAPI) {
            ctrl = $controller('previsaoController');

            spyOn(previsaoAPI, 'carregaPrevisoes', 'Floripa').and.returnValue({
                success: function(callback) {
                    callback(dados);
                }
            });

        });
    });


    it('deveria buscar a previsao por nome da cidade', function() {
        ctrl.buscaPrevisao('Floripa');
        expect(ctrl.cidadeSelecionada).toEqual(dados);
        expect(ctrl.showError).toEqual(false);
    });

});


describe('PrevisaoController', function() {
    var ctrl;
    var dados = {
        cod: '404'
    };
    beforeEach(function() {
        module('previsaoDoTempo');
    });

    beforeEach(function() {
        inject(function($controller, previsaoAPI) {
            ctrl = $controller('previsaoController');

            spyOn(previsaoAPI, 'carregaPrevisoes').and.returnValue({
                success: function(callback) {
                    callback(dados);
                }
            });

        });
    });

    it('deveria retornar erro', function() {
        ctrl.buscaPrevisao('vazio');
        expect(ctrl.cidadeSelecionada).toEqual(dados);
        expect(ctrl.showError).toEqual(true);
    });
});
