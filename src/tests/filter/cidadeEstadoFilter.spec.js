
describe('Teste filter Cidade  Estado', function() {
    var _filter;

    beforeEach(function() {
        module('previsaoDoTempo');

        inject(function($filter) {
            _filter = $filter('cidadeEstado');
        });
    });


        it('deveria formatar nome da cidade e estado', function() {
          var cidade = 'Florianópolis';
          var estado = 'SC';
          var resultado = _filter(cidade, estado);
          expect(resultado).toEqual('Florianópolis - SC');
        });

});
