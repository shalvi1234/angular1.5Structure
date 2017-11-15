/* eslint angular/di: [2,"array"]*/
angular.module('core.Session', [])
    .service('Session', ['$localStorage', function ($localStorage) {
      this.create = function (sessionId, userId) {
        $localStorage.user = {};

        this.id = sessionId;
        this.userId = userId;
        $localStorage.user.id = this.id;
        $localStorage.user.userId = this.userId;
      };
      this.destroy = function () {
        this.id = null;
        this.userId = null;
        $localStorage.$reset();
      };
      this.getAuthToken = function () {
        return ((this.id === null || angular.isUndefined(this.id) && angular.isDefined($localStorage.user)) ? $localStorage.user.id : this.id);
      };
      this.getUserName = function () {
        return ((this.userId === null || angular.isUndefined(this.userId) && angular.isDefined($localStorage.user)
                          ) ? $localStorage.user.userId : this.userId);
      };
    }]);
