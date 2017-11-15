/* eslint new-cap:1 */

module.exports = {
  template: require('./viewBlocks.html'),
  controller: viewBlocksController,
  controllerAs: 'viewBlocksCtrl'
};
viewBlocksController.$inject = ['$http', 'auth', 'Session', '$location', '$rootScope', '$state', 'configService'];

function viewBlocksController($http, auth, Session, $location, $rootScope, $state, configService) {
    var self = this;
    self.baseHref = configService.baseHref;
    
    self.listOfBlocks =[];
    
    self.block1 = {
        user : "Shane Watson",
        id : 1,
        tx : 20,
        rew : 2
    };
    self.block2 = {
        user : "Harry Crane",
        id : 2,
        tx : 78,
        rew : 5
    };    
    self.block3 = {
        user : "Mary Jane",
        id : 3,
        tx : 40,
        rew : 4
    };    
    self.block4 = {
        user : "June Brown",
        id : 4,
        tx : 67,
        rew : 9
    };    
    self.block5 = {
        user : "Eva Steves",
        id : 5,
        tx : 34,
        rew : 1
    };    
    self.block6 = {
        user : "Anna Winsten",
        id : 6,
        tx : 89,
        rew : 5
    };
    self.listOfBlocks.push(self.block1);
    self.listOfBlocks.push(self.block2);
    self.listOfBlocks.push(self.block3);
    self.listOfBlocks.push(self.block4);
    self.listOfBlocks.push(self.block5);
    self.listOfBlocks.push(self.block6);


}
