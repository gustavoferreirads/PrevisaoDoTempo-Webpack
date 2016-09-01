import angular from 'angular';

var uiAlert = require('./directives/uiAlertDirective.js'); // Usando o require do
var uiAccordions = require('./directives/uiAccordionsDirective.js');
var uiAccordion = require('./directives/uiAccordionDirective.js');
var uiDate = require('./directives/uiDateDirective.js');

import uiRouter  from 'angular-ui-router';
import ngRouter from 'angular-route';
import previsaoController from './controllers/previsaoController.js';
import previsaoAPI from './services/previsaoAPI.js';


import cidadeEstadoFilter from './filter/cidadeEstadoFilter.js';
import nameFilter from './filter/nameFilter.js';

import config from './config/configValue.js';
import configRouter from './config/configRouter.js';
import configUiRouter from './config/configUiRouter.js';
import configInterceptor from './config/configInterceptor.js';

import errorInterceptor from './interceptors/errorInterceptor.js';
import loadingInterceptor from './interceptors/loadingInterceptor.js';
import timestampInterceptor  from './interceptors/timestampInterceptor.js';


angular.module("previsaoDoTempo",[ngRouter,uiRouter])
    .controller('previsaoController', previsaoController)
    .service('previsaoAPI', previsaoAPI)
    .filter('cidadeEstado', cidadeEstadoFilter)
    .filter('descricao', nameFilter)
    .directive('uiAlert', uiAlert)
    .directive('uiDate', uiDate)
    .directive('uiAccordion', uiAccordion)
    .directive('uiAccordions', uiAccordions)
    .factory('errorInterceptor',errorInterceptor)
    .factory('loadingInterceptor', loadingInterceptor)
    .factory('timestampInterceptor', timestampInterceptor)
    // .config(configRouter) //USANDO NG ROUTER
    .config(configUiRouter)
    .config(configInterceptor)
     .value('config', config);
