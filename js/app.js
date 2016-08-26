require('bootstrap');
var angular = require('angular');
var uiRouter = require('angular-ui-router');

var controller = require('./controllers/previsaoController.js');
var previsaoAPI = require('./services/previsaoAPI.js');
var uiAlert = require('./directives/uiAlertDirective.js');
var uiAccordions = require('./directives/uiAccordionsDirective.js');
var uiAccordion = require('./directives/uiAccordionDirective.js');
var uiDate = require('./directives/uiDateDirective.js');
var cidadeEstadoFilter = require('./filter/cidadeEstadoFilter.js');
var nameFilter = require('./filter/nameFilter.js');
var config = require('./config/configValue.js');

angular.module("previsaoDoTempo", [])
    .controller('previsaoController', controller)
    .service('previsaoAPI', previsaoAPI)
    .directive('uiAlert', uiAlert)
    .directive('uiDate', uiDate)
    .directive('uiAccordion', uiAccordion)
    .directive('uiAccordions', uiAccordions)
    .filter('cidadeEstado', cidadeEstadoFilter)
    .filter('descricao', nameFilter)
    .value('config', config);
