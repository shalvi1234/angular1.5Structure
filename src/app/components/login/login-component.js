/* eslint new-cap:1 */

module.exports = {
  template: require('./login.html'),
  controller: loginController,
  controllerAs: 'loginCtrl'
};
loginController.$inject = ['$http', 'auth', 'Session', '$location', '$rootScope', '$state', 'configService'];

function loginController($http, auth, Session, $location, $rootScope, $state, configService) {
  var self = this;
  self.baseHref = configService.baseHref;
  this.username = '';
  this.password = '';
  self.activeTab = 'LOGIN';

  this.login = function () {
    console.log('login Controller ...login()');

/*    var promise = auth.Auth(self.username, self.password);

    promise.then(function (responce) {
      if (responce && responce.data.data === 'Authenticated') {
        auth.setAuthToken(responce, self.username);
        $state.go('app.dashboard');
      } else {
        console.log("routed to login page.....");
        self.error_message = 'Invalid Username Or Passsword....';
        $state.go('login');
      }
    });*/
       $state.go('app.dashboard');
  };
    self.setactive = function (text) {
        self.activeTab = text;
    };
  this.signup = function () {
        $state.go('app.dashboard');
  };
    this.showSignUp =function(){
        self.activeTab ="SIGNUP";
    }
    this.showLogin = function(){
        self.activeTab= "LOGIN";
    }
    this.generateUserName = function(){
        self.generatedUserName = "pumpkin";
    }
}
