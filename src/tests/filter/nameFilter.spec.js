
describe('Teste filter descricao', function() {
    var $filter;

    beforeEach(function() {
        module('previsaoDoTempo');

        inject(function(_$filter_) {
            $filter = _$filter_;
        });
    });


        it('deveria formatar nome da cidade', function() {
          var descricao = 'flor de napolis';
          var resultado = $filter('descricao')(descricao);
          expect(resultado).toEqual('Flor de Napolis');
        });

});
