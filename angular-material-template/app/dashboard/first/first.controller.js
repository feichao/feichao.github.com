(function() {
  'use strict';

  /**
   * @ngInject
   */
  function firstConfig($stateProvider) {
    $stateProvider
      .state('dashboard.first', {
        url: '/first',
        templateUrl: 'app/dashboard/first/first.html',
        controllerAs: 'vm',
        controller: 'FirstCtrl',
        resolve: FirstCtrl.resolve
      });
  }

  /**
   * @ngInject
   */
  function FirstCtrl(initData) {
    var vm = this;
    
  }

  FirstCtrl.resolve = {
    /**
     * @ngInject
     */
    initData: function() {
      return true;
    }
  };


  angular
    .module('myApp.dashboard')
    .controller('FirstCtrl', FirstCtrl)
    .config(firstConfig);

})();
