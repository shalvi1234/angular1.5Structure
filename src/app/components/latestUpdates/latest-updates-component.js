/* eslint new-cap:1 */

module.exports = {
  template: require('./latestUpdates.html'),
  controller: latestUpdatesController,
  controllerAs: 'latestUpdatesCtrl'
};
latestUpdatesController.$inject = ['$http', 'auth', 'Session', '$location', '$rootScope', '$state', 'configService'];

function latestUpdatesController($http, auth, Session, $location, $rootScope, $state, configService) {
    var self = this;
    self.baseHref = configService.baseHref;
    self.pslCoins = 100;
    self.latestUpdates =[];
    
    self.latestUpdatesObj1 = {
        fromUser : "Shane Watson",
        toUser : "Mary Cooper",
        noOfCoins :  10,
        timeDate : "10 Nov 2016, 11:30am"
    };
    self.latestUpdatesObj2 = {
        fromUser : "Donald Trump",
        toUser : "Harry Crane",
        noOfCoins :  100,
        timeDate : "17 Dec 2016, 1:50am"
    };
    self.latestUpdates.push(self.latestUpdatesObj1);
    self.latestUpdates.push(self.latestUpdatesObj2);
}
