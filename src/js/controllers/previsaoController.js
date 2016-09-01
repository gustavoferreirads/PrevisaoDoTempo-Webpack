export default function(previsaoAPI, $state) {
  'ngInject';
     this.titulo = 'Previsão do Tempo';
     this.error = 'Cidade não encontrada!';
     this.titleError = 'Ops, aconteceu um problema!';


      this.buscaPrevisao = () => {
          previsaoAPI.carregaPrevisoes(this.nomeDaCidade).success((data, status) => {
              this.cidadeSelecionada = data;
              this.showError = data.cod === '404';
          });
      };

     if ($state.params.nomeCidade) {
         this.nomeDaCidade = $state.params.nomeCidade;
         this.buscaPrevisao();
         return;
     }

     let contato = {
         data: 1034218800000
     };
 };
