(function() {
  'use strict';

  /**
   * @ngInject
   */
  function FirstService() {
    var firstService = {};
    
    return firstService;
  }

  angular
    .module('myApp.dashboard')
    .factory('FirstService', FirstService);

})();
