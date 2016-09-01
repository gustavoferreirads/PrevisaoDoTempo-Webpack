var templateCache = require('../../view/alert.html');
module.exports = function() { //como é case sentive ele gera ui-alert
  console.log(templateCache);
    return {
        //  templateUrl: "../view/alert.html",
        template: templateCache,
        //    replace: true; remove os elementos externo levando em consideração só os elementos do template
        restrict: "AE", // A = Atributo , E = Elemento, C = classe do elemento, M = Comentário  .Restringe o modo de utilização da diretica
        scope: { // Por padrão compartilha o scopo de onde foi aplicada, Aqui restringe, isola o escopo da diretiva. E faz a mediação dos dois escopos
            title: "@", // Vincula o valor do atributo da diretiva com uma propriedade do scope da diretiva.
            message: "=" // o valor '=' cria um vinculo bi-derecial em entre a propriedade do scopo do controller com a propriedade do scopo da Diretiva, alterando a propriedade do scopo 1 ele reflete direto no scopo da diretiva
        },
        transclude: false // leva em consideração o conteudo da diretiva usando a propriedade ng-transclude no template, Nota: também cria outro escopo especifico para o transclude mas herda as propriedades do escopo externo
    };
};
//Ler sobre a api $Compile
