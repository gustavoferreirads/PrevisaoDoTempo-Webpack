const angular = require('angular');
const uiRouter = require('angular-ui-router');
const controller = require('./controllers/previsaoController.js');
const previsaoAPI = require('./services/previsaoAPI.js');
const uiAlert = require('./directives/uiAlertDirective.js');
const uiAccordions = require('./directives/uiAccordionsDirective.js');
const uiAccordion = require('./directives/uiAccordionDirective.js');
const uiDate = require('./directives/uiDateDirective.js');
const cidadeEstadoFilter = require('./filter/cidadeEstadoFilter.js');
const nameFilter = require('./filter/nameFilter.js');
const config = require('./config/configValue.js');
const configRouter = require('./config/configRouter.js');

angular.module("previsaoDoTempo", ["ngRoute", uiRouter])
    .controller('previsaoController', controller)
    .service('previsaoAPI', previsaoAPI)
    .directive('uiAlert', uiAlert)
    .directive('uiDate', uiDate)
    .directive('uiAccordion', uiAccordion)
    .directive('uiAccordions', uiAccordions)
    .filter('cidadeEstado', cidadeEstadoFilter)
    .filter('descricao', nameFilter)
    //.config(configRouter)
    .value('config', config);
