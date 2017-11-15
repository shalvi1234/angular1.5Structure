/* eslint new-cap:1 */

module.exports = {
  template: require('./sendCoins.html'),
  controller: sendCoinsController,
  controllerAs: 'sendCoinsCtrl'
};
sendCoinsController.$inject = ['$http', 'auth', 'Session', '$location', '$rootScope', '$state', 'configService'];

function sendCoinsController($http, auth, Session, $location, $rootScope, $state, configService) {
    var self = this;
    self.baseHref = configService.baseHref;
    
    self.listOfUsers =[];
    
    self.user1 = {
        user : "Shane Watson",
        id : 1
    };
    self.user2 = {
        user : "Harry Crane",
        id : 2
    };    
    self.user3 = {
        user : "Mary Jane",
        id : 3
    };    
    self.user4 = {
        user : "June Brown",
        id : 4
    };    
    self.user5 = {
        user : "Eva Steves",
        id : 5
    };    
    self.user6 = {
        user : "Anna Winsten",
        id : 6
    };
    self.listOfUsers.push(self.user1);
    self.listOfUsers.push(self.user2);
    self.listOfUsers.push(self.user3);
    self.listOfUsers.push(self.user4);
    self.listOfUsers.push(self.user5);
    self.listOfUsers.push(self.user6);


}
