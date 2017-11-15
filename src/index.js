/* eslint angular/di: [2,"array"]*/
/* eslint angular/document-service: 1*/
/* eslint angular/module-getter: 1*/

var angular = require('angular');

var headerModule = require('./app/components/header/index');
var footerModule = require('./app/components/footer/footer-module.js');
var loginModule = require('./app/components/login/index');
var dashboardModule = require('./app/components/dashboard/index');
var latestUpdatesModule = require('./app/components/latestUpdates/index');
var sendCoinsModule = require('./app/components/sendCoins/index');
var viewBlocksModule = require('./app/components/viewBlocks/index');


var core = require('./app/core/index');

require('angular-ui-router');
require('angular-ui-bootstrap');
require('angular-animate');
require('angular-sanitize');
require('angular-pageslide-directive');
require('ngstorage');
var routesConfig = require('./routes');

var main = require('./app/main');
require('./index.css');
require('./assets/css/bootstrap.min.css');
require('./assets/css/bootstrap-extend.min.css');
require('./assets/css/site.min.css');

angular
    .module('app', ['ui.router', 'ui.bootstrap', 'pageslide-directive', 'ngAnimate', 'ngSanitize', core, loginModule, headerModule, footerModule, dashboardModule, latestUpdatesModule, sendCoinsModule, viewBlocksModule, 'ngStorage'])
    .config(routesConfig)
    .component('app', main)
    .constant('API_CONFIG', {API_VERSION: "6.0"})
    .run(['$state', '$stateParams', function ($state, $stateParams) {
    }])
    .provider('configService', function () {
      var self = this;
      self.options = {};
      self.config = function (opt) {
        self.options = opt;
      };
      self.$get = [function () {
        if (!self.options) {
          throw new Error('API Config options must be configured');
        }
        return self.options;
      }];
    });

angular.element(document).ready(function () {
  var bases = document.getElementsByTagName('base');
  var baseHref = null;

  if (bases.length > 0) {
    baseHref = bases[0].href;
  }
  console.log("BASE HREF" + baseHref);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var configData = angular.fromJson(this.responseText);
      angular.module('app').config(['configServiceProvider', function (configServiceProvider) {
        configData.baseHref = baseHref;
        configServiceProvider.config(configData);
      }]);

      angular.bootstrap(document.querySelector('#InvestorDay'), ['app']);
    }
  };
  xhttp.open("GET", "app/config/api-config.json", true);
  xhttp.send();
});
