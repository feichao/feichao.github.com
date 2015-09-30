(function() {
  'use strict';

  /**
   * @ngInject
   */
  function mainConfig(localStorageServiceProvider, $urlRouterProvider, $mdThemingProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/login');

    localStorageServiceProvider.setPrefix('myApp');

    $httpProvider.interceptors.push('TokenInterceptor');

    // Config default theme
    $mdThemingProvider.theme('default')
      .primaryPalette('blue');
  }

  /**
   * @ngInject
   */
  function TokenInterceptor(StorageManager) {
    return {
      request: function(config) {
        var token = StorageManager.getToken();
        if (token) {
          config.headers.Authorization = token;
        }
        return config;
      }
    };
  }

  angular
    .module('myApp', [
      'myApp.login',
      'myApp.dashboard'
    ])
    .config(mainConfig)
    .factory('TokenInterceptor', TokenInterceptor);
})();
