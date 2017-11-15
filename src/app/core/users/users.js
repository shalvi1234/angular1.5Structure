/* eslint angular/di: [2,"array"]*/
angular.module('core.users', [])
    .factory('beneficiaries', [
      function () {
        var beneficiaries = {
          users: [],
          addUser: function (user) {
            beneficiaries.users.push(user);
            return true;
          },
          removeUser: function (user) {
            var i;
            for (i = 0; i < beneficiaries.users.length; i++) {
              console.log();
              console.log("users[i].name  user.name");
              if (beneficiaries.users[i].User.Attributes.cn === user.User.Attributes.cn) {
                beneficiaries.users.splice(i, 1);
                return true;
              }
            }
            return false;
          },
          clearAll: function () {
            beneficiaries.users = [];
            return true;
          },
          getUsers: function () {
            return beneficiaries.users;
          }
        };

        return beneficiaries;
      }
    ])
    .factory('duplicate', [
      function () {
        var duplicate = {
          users: [],
          addUser: function (user) {
            duplicate.users.push(user);
            return true;
          },
          removeUser: function (user) {
            var i;
            for (i = 0; i < duplicate.users.length; i++) {
              if (duplicate.users[i].user.User.Attributes.cn === user.User.Attributes.cn) {
                duplicate.users.splice(i, 1);
                return true;
              }
            }
            return false;
          },
          clearAll: function () {
            duplicate.users = [];
            return true;
          },
          getUsers: function () {
            return duplicate.users;
          }
        };

        return duplicate;
      }
    ])
    .service('userDetails', ['$http', '$q', 'roles', '$injector', 'services', 'auth', 'configService', function ($http, $q, roles, $injector, services, auth, configService) {
      this.userAccountDetails = function () {
        return {
          accountDetails: this.accountDetails
        };
      };
      this.userProfileDetails = function () {
        return {
          profileDetails: this.profileDetails
        };
      };
      this.setUserAccountDetails = function (accountDetails) {
        this.accountDetails = accountDetails ? accountDetails : undefined;
      };
      this.setUserProfileDetails = function (profileDetails) {
        this.profileDetails = profileDetails ? profileDetails : this.profileDetails;
      };
      this.fetchUserAccountDetails = function (username) {
        var deferred = $q.defer();
        $http.get('http://' + configService.apiHost + ':' + configService.apiPort + '/api/user/AccountDetails/' + username + '/' + auth.getAuthToken(), {
          headers: {
            Accept: 'application/json'
          }
        }).then(function (responce) {
          deferred.resolve(responce);
        });

        return deferred.promise;
      };

      this.getAllChallenge = function () {
        console.log("requesteeDN Angular Service");
        var promise = $http.get('http://' + configService.apiHost + ':' + configService.apiPort + '/getAllChallenge/' + auth.getAuthToken(), {}, {
          headers: {
            Accept: 'application/json'
          }
        });
        return promise;
      };
      this.setChallenge = function (data) {
                // console.log("setChallengeResponse Angular Service: "+data);
        var promise = $http.put('http://' + configService.apiHost + ':' + configService.apiPort + '/setChallenge/' + auth.getAuthToken(), data, {
          headers: {
            Accept: 'application/json'
          }
        });
        return promise;
      };

      this.fetUserProfileDetails = function (owner) {
        var deferred = $q.defer();
        $http.get('http://' + configService.apiHost + ':' + configService.apiPort + '/api/user/ProfileDetails/' + owner + '/' + auth.getAuthToken(), {
          headers: {
            Accept: 'application/json'
          }
        })
                    .then(function (responce) {
                      deferred.resolve(responce);
                    });

        return deferred.promise;
      };
      this.getAllUsers = function () {
        var deferred = $q.defer();
        $http.get('http://' + configService.apiHost + ':' + configService.apiPort + '/api/user/getAllUsers/' + auth.getAuthToken(), {
          headers: {
            Accept: 'application/json'
          }
        })
                    .then(function (responce) {
                      deferred.resolve(responce);
                    });

        return deferred.promise;
      };
      this.getUserRoles = function (user) {
        var deferredObject = $q.defer();
        var AllRolesPromise = roles.getAllRoles();

        var erroles_user = user.User.Attributes.erroles;
        var listUserRoleObject = [];
        if (erroles_user) {
          if ((erroles_user.split(',')).length === 1) {
            erroles_user = erroles_user.split(',');
          } else {
            erroles_user = erroles_user.slice(1, -1);
            erroles_user = erroles_user.split(',');
          }
        } else {
          erroles_user = [];
        }
        AllRolesPromise.then(function (response) {
          var roles_all = response.data.data.RoleDetailsResponse;
          var userRole;
          for (userRole in erroles_user) {
            erroles_user[userRole] = erroles_user[userRole].trim();
            var role;
            for (role in roles_all) {
              if (erroles_user[userRole] === roles_all[role].Role.Attributes.errolename) {
                listUserRoleObject.push(roles_all[role]);
              }
            }
          }
          deferredObject.resolve(listUserRoleObject);
        });

        return deferredObject.promise;
      };
      this.getUserApps = function (user) {
        var listUserAccountsPromise = $injector.get('accounts').getUserAccount(user.User.Attributes.DN);
        var AllServicesPromise = services.getAllServices();
        var listUserAppObject = [];
        var deferredObject = $q.defer();

        AllServicesPromise.then(function (response) {
          var allServices = response.data.data.ServiceDetailsResponse;
          listUserAccountsPromise.then(function (response) {
            var userAccounts = response.data.data.AccountDetailsResponse;
            var i;
            for (i = 0; i < userAccounts.length; i++) {
              var j;
              for (j = 0; j < allServices.length; j++) {
                if (userAccounts[i].Account.Attributes.erservice.includes(allServices[j].Service.Attributes.erglobalid)) {
                  var appObj = {};
                  appObj.AccountDetailsResponse = userAccounts[i];
                  appObj.ServiceDetailsResponse = allServices[j];
                  listUserAppObject.push(appObj);
                }
              }
            }
          });
          deferredObject.resolve(listUserAppObject);
        });
        return deferredObject.promise;
      };
      this.newUserRegistration = function (userData) {
        var deferred = $q.defer();
        $http.post('http://' + configService.apiHost + ':' + configService.apiPort + '/api/user/userRegistration/', {
          userData: userData
        }, {
          headers: {
            Accept: 'application/json'
          }
        }).then(function (responce) {
          deferred.resolve(responce);
        });

        return deferred.promise;
      };
    }
    ]);
