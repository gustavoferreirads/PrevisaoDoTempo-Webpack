var templateCache = require('../../view/accordion.html');

module.exports = function() {
  console.log(templateCache)
    return {
        template: templateCache,
        //templateUrl: "view/accordion.html",
        transclude: true,
        scope: {
            title: "@"
        },
        require: "^uiAccordions",
        link: function(scope, element, attrs, ctrl) {
            'ngInject';
            ctrl.registerAccordion(scope);
            scope.open = function() {
                ctrl.closeAll();
                scope.isOpened = !scope.isOpened;
            };
        }
    };
};
