/* eslint angular/di: [2,"array"]*/
angular.module('core.interceptors')
    .factory('requestInterceptor', ['$q', function ($q) {
      var requestInterceptor = {
        request: function (config) {
          console.log('request interceptor ...request');
          return config;
        },
        requestError: function (rejection) {
                // Session has expired

          return $q.reject(rejection);
        }
      };
      return requestInterceptor;
    }]).config(['$httpProvider', function ($httpProvider) {
      $httpProvider.interceptors.push('requestInterceptor');
    }]);
