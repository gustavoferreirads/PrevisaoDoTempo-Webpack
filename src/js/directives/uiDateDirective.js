module.exports = function($filter) { //como é case sentive ele gera ui-alert
    'ngInject';
    return {
        require: "ngModel", // Diz a qual api a diretiva quer ter acesso e recebe isso no 4 parametro no link "ctrl" Estudar api ngModel e Element
        link: function(scope, element, attrs, ctrl) { // Mesmo escopo do controller caso não isole o escopo da diretiva, dentreo,
                //        'ngInject';
                //console.log(attrs);
                console.log(ctrl); //ELement tem muitas operações ler refernecia

                const _formatDate = (date) => {
                    console.log(date);
                    date = date.replace(/[^0-9]+/g, "");
                    if (date.length > 2) {
                        date = date.substring(0, 2) + "/" + date.substring(2);
                    }
                    if (date.length > 5) {
                        date = date.substring(0, 5) + "/" + date.substring(5, 9);
                    }
                    return date;
                };

                element.bind("keyup", function() {
                    ctrl.$setViewValue(_formatDate(ctrl.$viewValue));
                    ctrl.$render(); // diz pro escopo quer algo mudou
                });

                ctrl.$parsers.push(function(value) { // intercepta a chamada ao escopo
                    if (value.lenght === 10) {
                        return value;
                    }
                });

                ctrl.$formatters.push(function(value) {
                    return $filter("date")(value, "dd/MM/yyyy");
                });
            } //Executada depois do template for compilado e ela interage com a DOM
    };
};
