module.exports = routesConfig;

var chkloggedIn = function ($location, $q, auth) {
  console.log('checking session');
  var deferred = $q.defer();

  if (auth.getAuthToken()) {
    console.log(auth.getAuthToken());
    deferred.resolve();
  } else {
    console.log("auth.getAuthToken()");
    console.log(auth.getAuthToken());
    $location.path('/login');
    deferred.reject();
  }

  return deferred.promise;
};

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  }).hashPrefix('!');
  $urlRouterProvider.otherwise('/Investor/dashboard');

  $stateProvider
        .state('app', {
          url: '/Investor',
          component: 'app'
        })
        .state('app.dashboard', {
          url: '/dashboard',
          component: 'dashboard',
    /*      resolve: {
            loggedIn: chkloggedIn
          }*/
        })       
       .state('app.latestUpdates', {
          url: '/latestUpdates',
          component: 'latestUpdates'
        })       
        .state('app.sendCoins', {
          url: '/sendCoins',
          component: 'sendCoins'
        })        
        .state('app.viewBlocks', {
          url: '/viewBlocks',
          component: 'viewBlocks'
        })
        .state('header', {
          url: '/header',
          component: 'pageHeader'
        })
        .state('login', {
          url: '/login',
          component: 'pageLogin'
        });
}

