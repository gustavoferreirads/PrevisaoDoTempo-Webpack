 export default funtion(previsaoAPI) {
     'ngInject';
     this.titulo = 'Previsão do Tempo';
     this.error = 'Cidade não encontrada!';
     this.titleError = 'Ops, aconteceu um problema!';

     let contato = {
         data: 1034218800000
     };

     this.buscaPrevisao = () => {
         previsaoAPI.carregaPrevisoes(this.nomeDaCidade).success((data, status) => {
             this.cidadeSelecionada = data;
             this.showError = data.cod === '404';
         });
     };
 };
