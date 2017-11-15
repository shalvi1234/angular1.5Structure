/* eslint angular/di: [2,"array"]*/
angular.module('core.auth', [])
    .factory('auth', ['$http', 'Session', '$rootScope', 'configService',

      function ($http, Session, $rootScope, configService) {
        var auth = {};
        auth.getAuthToken = function () {
          return Session.getAuthToken();
        };
        auth.getUserName = function () {
          return Session.getUserName();
        };
        auth.Auth = function (username, Password) {
          var promise = $http.post('http://' + configService.apiHost + ':' + configService.apiPort + '/api/auth/authenticate', {
            username: username,
            password: Password
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'text/plain'
            }
          });

          return promise;
        };

        auth.setAuthToken = function (responce, username) {
          Session.create(responce.data.authToken, username);

          $rootScope.$broadcast('authorized');
        };

        auth.deleteAuthToken = function () {
          Session.destroy();
        };

        return auth;
      }
    ]);
