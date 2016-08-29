module.exports = function() {
    return {
        templateUrl: "view/accordion.html",
        transclude: true,
        scope: {
            title: "@"
        },
        require: "^Accordions",
        link: function(scope, element, attrs, ctrl) {
            'ngInject';
            ctl.helloWorld();
            ctrl.registerAccordion(scope);
            scope.open = function() {
                ctrl.closeAll();
                scope.isOpened = !scope.isOpened;
            };
        }
    };
};
