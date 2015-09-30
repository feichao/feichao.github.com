(function() {
  'use strict';

  /**
   * @ngInject
   */
  function DashboardService($http, Util) {
    var dashboardService = {};

    dashboardService.modifyUserProfile = function(userId, data, cb){
      cb();
    };

    dashboardService.modifyPassword = function(userId, data, cb){
      cb();
    };

    
    return dashboardService;
  }

  angular
    .module('myApp.dashboard')
    .factory('DashboardService', DashboardService);

})();
