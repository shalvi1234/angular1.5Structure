
var loginComponent = require('./login-component');
/*var forgotPasswordComponent = require('./forgot-password-component');*/

angular.module('login', []).component('pageLogin', loginComponent)/*
    .component('forgotPassword', forgotPasswordComponent)*/;

module.exports = 'login';
