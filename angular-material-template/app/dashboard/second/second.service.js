(function() {
  'use strict';

  /**
   * @ngInject
   */
  function SecondService($q) {
    var clientListService = {};
    return clientListService;
  }

  angular
    .module('myApp.dashboard')
    .factory('SecondService', SecondService);

})();
