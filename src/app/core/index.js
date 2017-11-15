require('./auth/auth.js');
require('./session/session.js');
require('./Interceptors/index.js');
require('./Interceptors/responce-interceptor.js');
require('./Interceptors/request-interceptor.js');

angular.module('core', ['core.auth', 'core.Session', 'core.interceptors']);

module.exports = 'core';
