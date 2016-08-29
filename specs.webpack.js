require('angular');
require('angular-mocks/angular-mocks');
require('./src/js/app.js');

var testsContext = require.context('./src/tests', true, /.spec$/);
testsContext.keys().forEach(testsContext);
