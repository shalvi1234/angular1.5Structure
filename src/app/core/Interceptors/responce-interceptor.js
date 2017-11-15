/* eslint angular/di: [2,"array"]*/
angular.module('core.interceptors')
    .factory('responceInterceptor', ['$q', '$injector', '$rootScope', function ($q, $injector, $rootScope) {
      var responceInterceptor = {
        response: function (abcd) {
          console.log('response interceptor ...responce');
          console.log(abcd);
          if (angular.isDefined(abcd.data.data) && angular.isDefined(abcd.data.data.Response)) {
//            console.log("abcd.data.data");
//            console.log("abcd.data.data");
            if (abcd.data.data.Response.DetailedMsg === '101:Authentication Key Expired!') {
              console.log("auth Token Expired");
              $injector.get('auth').deleteAuthToken();
              $injector.get('$state').transitionTo('login');
            }
          }
          return abcd;
        },
        responseError: function (abcd) {
                // Session has expired
          console.log('response interceptor ...responseError');
          if (abcd.status === 401) {
            $rootScope.$broadcast('unauthorized');
          }
          return abcd;
        }
      };
      return responceInterceptor;
    }]).config(['$httpProvider', function ($httpProvider) {
      $httpProvider.interceptors.push('responceInterceptor');
    }]);
