 module.exports = function() {
     return {

         controller: function($scope, $element, $attrs) {
             'ngInject';
             var accordions = [];

             this.registerAccordion = function(accordion) {
                 accordions.push(accordion);
             };


             this.closeAll = function() {
                 accordions.forEach(function(accordion) {
                     accordion.isOpened = false;
                 });
             };
         }
     };
 };
