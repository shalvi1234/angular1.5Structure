
module.exports = {
  template: require('./index.html'),
  require: {
    app: '^^'
  },
  controller: headerController,
  controllerAs: 'headerCtrl'
};

headerController.$inject = ['$scope', '$http', 'auth', 'Session', 'configService'];
function headerController($scope, $http, auth, Session, configService) {

}
