describe('PrevisaoService', function() {
    var api;
    var cidade = 'Floripa';
    var url = "http://api.openweathermap.org/data/2.5/weather?APPID=b06246ab3117789f1d4b2e93a3683bec&lang=pt&units=metric&q=" + cidade;
    const expectedResult = {temperatura: 24};
    var $httpBackend;

        beforeEach(function() { module('previsaoDoTempo');});

        beforeEach(function() {
            inject(function(previsaoService, _$httpBackend_, config) {
                api = previsaoService;
                 $httpBackend = _$httpBackend_;

            });
        });

        it('Deve invocar com url correta', function() {
        	api.carregaPrevisoes(cidade);
          	$httpBackend.expectGET(url);
        });

});
