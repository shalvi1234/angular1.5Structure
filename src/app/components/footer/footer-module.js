// var angular = require('angular');
angular.module('footer', []).component('pageFooter', {
  template: require('./footer.html'),
  controller: footerController,
  controllerAs: 'footerCtrl'

});

footerController.$inject = [];
function footerController() {

}

module.exports = 'footer';
